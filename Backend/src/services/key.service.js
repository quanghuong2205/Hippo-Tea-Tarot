'use strict';
const crypto = require('crypto');

/* Define the service */
class KeyServices {
    /**
     * @desc generate a pair of keys (public and private key)
     */
    static generateKeyPair() {
        /* Generate key pair */
        const publicKey = crypto.randomBytes(64).toString();
        const privateKey = crypto.randomBytes(64).toString();

        /* Return key pair */
        return {
            publicKey,
            privateKey,
        };
    }
}

/**
 * Export service
 */
module.exports = KeyServices;
