/**
 * RBAC - Role-Based Access Control
 * 
 * Manages user permissions at field and action levels.
 * Supports role templates, custom permissions, and hierarchical roles.
 */

class RBAC {
    constructor(options = {}) {
        this.roles = options.roles || {};
        this.users = options.users || {};
        this.currentUser = null;
        this.storageKey = options.storageKey || 'rbac_data';
        this.load();
    }

    /**
     * Define a new role with permissions
     * @param {string} roleId - Role identifier
     * @param {Object} permissions - Permission object
     */
    defineRole(roleId, permissions) {
        this.roles[roleId] = {
            id: roleId,
            ...permissions,
            createdAt: new Date().toISOString()
        };
        this.save();
    }

    /**
     * Assign role to user
     * @param {string} userId 
     * @param {string} roleId 
     */
    assignRole(userId, roleId) {
        if (!this.roles[roleId]) {
            throw new Error(`Role ${roleId} does not exist`);
        }

        if (!this.users[userId]) {
            this.users[userId] = { id: userId, roles: [] };
        }

        if (!this.users[userId].roles.includes(roleId)) {
            this.users[userId].roles.push(roleId);
        }

        this.save();
    }

    /**
     * Remove role from user
     * @param {string} userId 
     * @param {string} roleId 
     */
    removeRole(userId, roleId) {
        if (this.users[userId]) {
            this.users[userId].roles = this.users[userId].roles.filter(r => r !== roleId);
            this.save();
        }
    }

    /**
     * Set current active user
     * @param {string} userId 
     */
    setCurrentUser(userId) {
        this.currentUser = userId;
    }

    /**
     * Check if user can perform action
     * @param {string} userId 
     * @param {string} permission - 'view', 'edit', 'approve', 'admin'
     * @param {string} resource - Resource type (e.g., 'project', 'payment', 'qa')
     * @param {string} resourceId - Optional specific resource ID
     * @returns {boolean}
     */
    can(userId, permission, resource, resourceId = null) {
        const user = this.users[userId];
        if (!user) return false;

        // Superuser check
        if (user.roles.includes('superuser') || user.roles.includes('admin')) {
            return true;
        }

        // Check each role
        for (const roleId of user.roles) {
            const role = this.roles[roleId];
            if (!role) continue;

            // Check permission level
            const perms = role[permission];
            if (!perms) continue;

            // Wildcard permission
            if (perms === '*' || perms.includes('*')) {
                return true;
            }

            // Array of allowed resources
            if (Array.isArray(perms) && perms.includes(resource)) {
                return true;
            }

            // Specific resource check
            if (typeof perms === 'object' && perms[resource]) {
                if (perms[resource] === '*') return true;
                if (Array.isArray(perms[resource]) && perms[resource].includes(resourceId)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if current user can perform action
     * @param {string} permission 
     * @param {string} resource 
     * @param {string} resourceId 
     * @returns {boolean}
     */
    canCurrent(permission, resource, resourceId = null) {
        if (!this.currentUser) return false;
        return this.can(this.currentUser, permission, resource, resourceId);
    }

    /**
     * Get all permissions for a user
     * @param {string} userId 
     * @returns {Object} Aggregated permissions
     */
    getUserPermissions(userId) {
        const user = this.users[userId];
        if (!user) return {};

        const aggregated = {
            view: new Set(),
            edit: new Set(),
            approve: new Set(),
            admin: new Set()
        };

        for (const roleId of user.roles) {
            const role = this.roles[roleId];
            if (!role) continue;

            ['view', 'edit', 'approve', 'admin'].forEach(perm => {
                if (role[perm]) {
                    if (role[perm] === '*') {
                        aggregated[perm].add('*');
                    } else if (Array.isArray(role[perm])) {
                        role[perm].forEach(r => aggregated[perm].add(r));
                    }
                }
            });
        }

        return {
            view: Array.from(aggregated.view),
            edit: Array.from(aggregated.edit),
            approve: Array.from(aggregated.approve),
            admin: Array.from(aggregated.admin)
        };
    }

    /**
     * Get user's roles
     * @param {string} userId 
     * @returns {Array} Role IDs
     */
    getUserRoles(userId) {
        return this.users[userId]?.roles || [];
    }

    /**
     * Check if user has specific role
     * @param {string} userId 
     * @param {string} roleId 
     * @returns {boolean}
     */
    hasRole(userId, roleId) {
        return this.getUserRoles(userId).includes(roleId);
    }

    /**
     * Filter data based on user permissions
     * @param {string} userId 
     * @param {Array} data 
     * @param {string} permission - 'view', 'edit', etc.
     * @returns {Array} Filtered data
     */
    filterByPermission(userId, data, permission = 'view') {
        return data.filter(item => {
            return this.can(userId, permission, item.type || 'project', item.id);
        });
    }

    /**
     * Mask sensitive fields based on permissions
     * @param {string} userId 
     * @param {Object} data 
     * @param {Array} sensitiveFields - Fields to mask
     * @returns {Object} Masked data
     */
    maskFields(userId, data, sensitiveFields = []) {
        const masked = { ...data };
        
        for (const field of sensitiveFields) {
            if (!this.can(userId, 'view', field)) {
                masked[field] = '***RESTRICTED***';
            }
        }

        return masked;
    }

    /**
     * Export roles configuration
     * @returns {Object}
     */
    export() {
        return {
            roles: this.roles,
            users: this.users
        };
    }

    /**
     * Import roles configuration
     * @param {Object} data 
     */
    import(data) {
        this.roles = data.roles || {};
        this.users = data.users || {};
        this.save();
    }

    /**
     * Save to localStorage
     * @private
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                roles: this.roles,
                users: this.users
            }));
        } catch (e) {
            console.error('Failed to save RBAC data:', e);
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
                const data = JSON.parse(saved);
                this.roles = data.roles || {};
                this.users = data.users || {};
            }
        } catch (e) {
            console.error('Failed to load RBAC data:', e);
        }
    }
}

// Predefined role templates
RBAC.ROLE_TEMPLATES = {
    PROJECT_MANAGER: {
        view: '*',
        edit: '*',
        approve: ['assessment', 'bids', 'scope'],
        admin: ['own-projects']
    },
    FINANCE: {
        view: '*',
        edit: ['budget', 'funding', 'payments'],
        approve: ['payment', 'budget-change'],
        admin: []
    },
    QA_INSPECTOR: {
        view: ['projects', 'qa-reports', 'installations'],
        edit: ['qa-report', 'inspection-notes'],
        approve: ['qa-gate', 'final-inspection'],
        admin: []
    },
    EXECUTIVE: {
        view: '*',
        edit: '*',
        approve: '*',
        admin: ['organization']
    },
    AUDITOR: {
        view: '*',
        edit: [],
        approve: [],
        admin: []
    },
    CONTRACTOR: {
        view: ['own-projects', 'bids', 'work-orders'],
        edit: ['bid-submission', 'progress-photos', 'completion-report'],
        approve: [],
        admin: []
    },
    CUSTOMER: {
        view: ['own-project', 'status', 'documents'],
        edit: ['contact-info', 'survey-response'],
        approve: ['final-acceptance'],
        admin: []
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RBAC;
}
