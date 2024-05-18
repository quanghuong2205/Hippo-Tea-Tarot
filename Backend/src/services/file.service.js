'use strict';
const fs = require('fs');
const { ServerError } = require('../helpers/error.res.helper');
const { getAbsolutePath } = require('../utils/multer.util');
const CODES = require('../utils/code.http');

/* Define the service */
class FileServices {
    static async removeSingleFile({ relativePath }) {
        /* Remove file */
        return new Promise((resolve, reject) => {
            const absolutePath = getAbsolutePath({
                relativePath,
            });

            fs.unlink(absolutePath, (error) => {
                if (error) {
                    reject(
                        new ServerError({
                            code: CODES.FAIL_TO_REMOVE_FILE,
                        })
                    );
                }
                resolve(true);
            });
        }).catch((error) => {
            throw error;
        });
    }

    static async removeMultiFiles({ relativePaths = [] }) {
        /* Remove files */
        return new Promise((resolve, reject) => {
            relativePaths.forEach((relativePath) => {
                const absolutePath = getAbsolutePath({
                    relativePath,
                });

                fs.unlink(absolutePath, (error) => {
                    if (error) {
                        reject(
                            new ServerError({
                                code: CODES.FAIL_TO_REMOVE_FILE,
                            })
                        );
                    }
                });
            });

            resolve(true);
        }).catch((error) => {
            throw error;
        });
    }
}

/**
 * Export service
 */
module.exports = FileServices;
