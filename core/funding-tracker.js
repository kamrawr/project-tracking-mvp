class FundingTracker {
    constructor() {
        this.commitments = [];
        this.disbursements = [];
        this.load();
    }
    addCommitment(c) {
        this.commitments.push({id: 'COM-'+Date.now(), ...c, date: new Date().toISOString()});
        this.save();
    }
    recordDisbursement(d) {
        this.disbursements.push({id: 'DIS-'+Date.now(), ...d, date: new Date().toISOString()});
        this.save();
    }
    getGap(projectId) {
        const committed = this.commitments.filter(c => c.projectId === projectId).reduce((sum, c) => sum + c.amount, 0);
        const disbursed = this.disbursements.filter(d => d.projectId === projectId).reduce((sum, d) => sum + d.amount, 0);
        return { committed, disbursed, remaining: committed - disbursed };
    }
    save() { localStorage.setItem('funding_data', JSON.stringify({commitments: this.commitments, disbursements: this.disbursements})); }
    load() { const data = JSON.parse(localStorage.getItem('funding_data') || '{}'); this.commitments = data.commitments || []; this.disbursements = data.disbursements || []; }
}
if (typeof module !== 'undefined') module.exports = FundingTracker;
