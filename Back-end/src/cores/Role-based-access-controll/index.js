'use strict';

const permissions = require('./permissions');

class RBAC {
    constructor() {
        this.permission = null;
    }

    setGrants({ permissionType }) {
        const permission = permissions[permissionType.toLowerCase()];
        if (!permission) {
            throw new Error('Invalid Permission Type');
        }

        this.permission = permission;
    }

    getGrants() {
        return this.permission;
    }

    granted({ role, resource, action }) {
        if (!this.permission) {
            throw new Error('Have not set permission type');
        }

        /* Check role */
        const permission = this.permission[role];
        if (!permission) return false;

        /* Check resource */
        const grantedResource = permission[resource];
        if (!grantedResource) return false;

        /* Check action */
        if (!grantedResource.find((a) => a === action)) return false;

        /* Has permission */
        return true;
    }
}

module.exports = RBAC;
