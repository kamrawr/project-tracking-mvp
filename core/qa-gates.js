class QAGates {
    constructor() {
        this.checkpoints = [];
        this.load();
    }
    create(cp) {
        this.checkpoints.push({id: 'QA-'+Date.now(), ...cp, status: 'pending', createdAt: new Date().toISOString()});
        this.save();
    }
    pass(projectId, stage) {
        const cp = this.checkpoints.find(c => c.projectId === projectId && c.stage === stage);
        if (cp) { cp.status = 'passed'; cp.passedAt = new Date().toISOString(); this.save(); }
    }
    fail(projectId, stage, reason) {
        const cp = this.checkpoints.find(c => c.projectId === projectId && c.stage === stage);
        if (cp) { cp.status = 'failed'; cp.failReason = reason; cp.failedAt = new Date().toISOString(); this.save(); }
    }
    isPassed(projectId, stage) {
        return this.checkpoints.some(c => c.projectId === projectId && c.stage === stage && c.status === 'passed');
    }
    save() { localStorage.setItem('qa_checkpoints', JSON.stringify(this.checkpoints)); }
    load() { this.checkpoints = JSON.parse(localStorage.getItem('qa_checkpoints') || '[]'); }
}
if (typeof module !== 'undefined') module.exports = QAGates;
