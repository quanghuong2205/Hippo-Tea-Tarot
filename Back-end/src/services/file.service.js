'use strict';
const fs = require('fs/promises');
const { ServerError } = require('../utils/error.response.util');
const { getAbsolutePath, FolderPaths } = require('../utils/multer.util');
const CODES = require('../utils/code.http');
const path = require('path');

/* Define the service */
class FileServices {
    static generateFileName({ fileObject }) {
        /* Generate unique suffix */
        const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}`;

        /* File extention */
        const fileExt = path.extname(fileObject.originalname);

        /* File name */
        const fileName = `${fileObject.fieldname}-${uniqueSuffix}${fileExt}`;

        return fileName;
    }

    static async removeSingleFile({ relativePath }) {
        /* Remove file */
        try {
            const absolutePath = getAbsolutePath({
                relativePath,
            });

            await fs.unlink(absolutePath);
        } catch (error) {
            throw new ServerError({
                code: CODES.FILE_FAIL_TO_REMOVE,
            });
        }
    }

    static async removeMultiFiles({ relativePaths = [] }) {
        /* Remove files */
        try {
            for (let i = 0; i < relativePaths.length; i++) {
                const absolutePath = getAbsolutePath({
                    relativePath: relativePaths[i],
                });

                await fs.unlink(absolutePath);
            }
        } catch (error) {
            throw new ServerError({
                code: CODES.FILE_FAIL_TO_REMOVE,
            });
        }
    }

    static async writeSingleFile({ fileObject, type }) {
        /* Get folderPath to store file */
        const folderPath = FolderPaths[type.toUpperCase()];
        if (!folderPath) {
            throw new ServerError({
                code: CODES.FILE_INVALID_PATH_TO_STORE,
                message: `The folder path[${type}] to store file not match`,
            });
        }

        /* Generate file name */
        const fileName = this.generateFileName({ fileObject });

        try {
            await fs.writeFile(
                `${folderPath.absolutePath}/${fileName}`,
                fileObject.buffer
            );
        } catch (error) {
            console.log(error);
            throw new ServerError({
                code: CODES.FILE_FAIL_TO_WRITE,
            });
        }
    }

    static async writeMultiFiles({ fileObjects = [], type }) {
        /* Get folderPath to store file */
        const folderPath = FolderPaths[type.toUpperCase()];
        if (!folderPath) {
            throw new ServerError({
                code: CODES.FILE_INVALID_PATH_TO_STORE,
                message: `The folder path[${type}] to store file not match`,
            });
        }

        /* Generate file name */
        try {
            for (let i = 0; i < fileObjects.length; i++) {
                const fileName = this.generateFileName({
                    fileObject: fileObjects[i],
                });

                await fs.writeFile(
                    `${folderPath.absolutePath}/${fileName}`,
                    fileObjects[i].buffer
                );
            }
        } catch (error) {
            console.log(error);
            throw new ServerError({
                code: CODES.FILE_FAIL_TO_WRITE,
            });
        }
    }
}

/**
 * Export service
 */
module.exports = FileServices;
