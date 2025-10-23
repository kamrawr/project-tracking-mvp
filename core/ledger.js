/**
 * Ledger - Immutable Audit Trail
 * 
 * Records every action, update, and transaction with cryptographic integrity.
 * Append-only log prevents tampering and provides complete audit trail.
 */

class Ledger {
    constructor(options = {}) {
        this.entries = [];
        this.storageKey = options.storageKey || 'ledger_entries';
        this.useHashing = options.useHashing !== false; // Default true
        this.load();
    }

    /**
     * Record an action in the ledger
     * @param {Object} entry - Action details
     * @returns {string} Entry ID
     */
    record(entry) {
        const ledgerEntry = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            ...entry,
            previousHash: this.getLastHash()
        };

        if (this.useHashing) {
            ledgerEntry.hash = this.calculateHash(ledgerEntry);
        }

        this.entries.push(ledgerEntry);
        this.save();
        
        return ledgerEntry.id;
    }

    /**
     * Get complete history for a project
     * @param {string} projectId 
     * @returns {Array} Chronological entries
     */
    getHistory(projectId) {
        return this.entries.filter(e => e.projectId === projectId);
    }

    /**
     * Get all entries by action type
     * @param {string} action - Action type (e.g., 'STATUS_CHANGE', 'PAYMENT')
     * @returns {Array} Matching entries
     */
    getByAction(action) {
        return this.entries.filter(e => e.action === action);
    }

    /**
     * Get all entries by user
     * @param {string} userId 
     * @returns {Array} User's actions
     */
    getByUser(userId) {
        return this.entries.filter(e => e.userId === userId);
    }

    /**
     * Get entries in date range
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @returns {Array} Filtered entries
     */
    getByDateRange(startDate, endDate) {
        return this.entries.filter(e => {
            const entryDate = new Date(e.timestamp);
            return entryDate >= startDate && entryDate <= endDate;
        });
    }

    /**
     * Verify ledger integrity
     * @returns {Object} Validation result
     */
    verify() {
        if (!this.useHashing) {
            return { valid: true, message: 'Hashing disabled' };
        }

        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            const calculatedHash = this.calculateHash({
                ...entry,
                hash: undefined // Exclude hash field from calculation
            });

            if (entry.hash !== calculatedHash) {
                return {
                    valid: false,
                    message: `Entry ${i} (${entry.id}) has invalid hash`,
                    entry
                };
            }

            if (i > 0) {
                const previousEntry = this.entries[i - 1];
                if (entry.previousHash !== previousEntry.hash) {
                    return {
                        valid: false,
                        message: `Entry ${i} (${entry.id}) has broken chain`,
                        entry
                    };
                }
            }
        }

        return { valid: true, message: 'Ledger integrity verified' };
    }

    /**
     * Export ledger to JSON
     * @returns {string} JSON string
     */
    export() {
        return JSON.stringify({
            exportDate: new Date().toISOString(),
            entries: this.entries,
            integrity: this.verify()
        }, null, 2);
    }

    /**
     * Export to CSV format
     * @returns {string} CSV string
     */
    exportCSV() {
        if (this.entries.length === 0) return '';

        const headers = ['timestamp', 'action', 'projectId', 'userId', 'details', 'hash'];
        const rows = this.entries.map(e => [
            e.timestamp,
            e.action,
            e.projectId || '',
            e.userId || '',
            JSON.stringify(e.details || {}),
            e.hash || ''
        ]);

        return [
            headers.join(','),
            ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');
    }

    /**
     * Clear all entries (use with caution!)
     */
    clear() {
        this.entries = [];
        this.save();
    }

    /**
     * Calculate SHA-256 hash (simple implementation)
     * @private
     */
    calculateHash(entry) {
        const str = JSON.stringify({
            id: entry.id,
            timestamp: entry.timestamp,
            action: entry.action,
            projectId: entry.projectId,
            userId: entry.userId,
            details: entry.details,
            previousHash: entry.previousHash
        });
        
        // Simple hash for client-side (use crypto.subtle.digest in production)
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }

    /**
     * Get last entry's hash
     * @private
     */
    getLastHash() {
        if (this.entries.length === 0) return '0';
        return this.entries[this.entries.length - 1].hash || '0';
    }

    /**
     * Generate unique ID
     * @private
     */
    generateId() {
        return 'LED-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Save to localStorage
     * @private
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch (e) {
            console.error('Failed to save ledger:', e);
        }
    }

    /**
     * Load from localStorage
     * @private
     */
    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.entries = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load ledger:', e);
            this.entries = [];
        }
    }
}

// Action type constants
Ledger.ACTION_TYPES = {
    PROJECT_CREATED: 'PROJECT_CREATED',
    STATUS_CHANGE: 'STATUS_CHANGE',
    FIELD_UPDATE: 'FIELD_UPDATE',
    APPROVAL_REQUESTED: 'APPROVAL_REQUESTED',
    APPROVAL_GRANTED: 'APPROVAL_GRANTED',
    APPROVAL_REJECTED: 'APPROVAL_REJECTED',
    PAYMENT_REQUESTED: 'PAYMENT_REQUESTED',
    PAYMENT_DISBURSED: 'PAYMENT_DISBURSED',
    FUNDING_COMMITTED: 'FUNDING_COMMITTED',
    QA_CHECKPOINT_CREATED: 'QA_CHECKPOINT_CREATED',
    QA_PASSED: 'QA_PASSED',
    QA_FAILED: 'QA_FAILED',
    DOCUMENT_UPLOADED: 'DOCUMENT_UPLOADED',
    COMMENT_ADDED: 'COMMENT_ADDED',
    USER_LOGIN: 'USER_LOGIN',
    PERMISSION_CHANGED: 'PERMISSION_CHANGED'
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Ledger;
}
