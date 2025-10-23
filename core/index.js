// Core module exports
const modules = {};
if (typeof window !== 'undefined') {
    modules.Ledger = window.Ledger || class Ledger {};
    modules.RBAC = window.RBAC || class RBAC {};
    modules.ApprovalEngine = window.ApprovalEngine || class ApprovalEngine {};
    modules.FundingTracker = window.FundingTracker || class FundingTracker {};
    modules.QAGates = window.QAGates || class QAGates {};
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Ledger: require('./ledger'),
        RBAC: require('./rbac'),
        ApprovalEngine: require('./approval-engine'),
        FundingTracker: require('./funding-tracker'),
        QAGates: require('./qa-gates')
    };
}
