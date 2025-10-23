/**
 * ApprovalEngine - Multi-Party Approval Workflows
 * Manages milestone-based approvals with configurable chains
 */
class ApprovalEngine {
    constructor(config = {}) {
        this.approvals = [];
        this.config = config;
        this.storageKey = 'approval_requests';
        this.load();
    }

    requestApproval(request) {
        const approval = {
            id: 'APR-' + Date.now(),
            ...request,
            status: 'pending',
            approvals: [],
            createdAt: new Date().toISOString()
        };
        this.approvals.push(approval);
        this.save();
        return approval.id;
    }

    approve(approvalId, userId, comments = '') {
        const approval = this.approvals.find(a => a.id === approvalId);
        if (!approval) throw new Error('Approval not found');
        
        approval.approvals.push({
            userId,
            action: 'approved',
            comments,
            timestamp: new Date().toISOString()
        });

        if (this.isFullyApproved(approval)) {
            approval.status = 'approved';
        }
        this.save();
    }

    reject(approvalId, userId, reason) {
        const approval = this.approvals.find(a => a.id === approvalId);
        if (!approval) throw new Error('Approval not found');
        
        approval.status = 'rejected';
        approval.rejectedBy = userId;
        approval.rejectionReason = reason;
        this.save();
    }

    isFullyApproved(approval) {
        const required = approval.requiredApprovers || [];
        const approved = approval.approvals.map(a => a.userId);
        return required.every(r => approved.includes(r));
    }

    getPending(userId = null) {
        if (!userId) return this.approvals.filter(a => a.status === 'pending');
        return this.approvals.filter(a => 
            a.status === 'pending' && 
            a.requiredApprovers.includes(userId)
        );
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.approvals));
    }

    load() {
        const saved = localStorage.getItem(this.storageKey);
        this.approvals = saved ? JSON.parse(saved) : [];
    }
}

if (typeof module !== 'undefined') module.exports = ApprovalEngine;
