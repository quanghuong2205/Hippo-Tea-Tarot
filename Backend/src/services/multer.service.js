'use strict';
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { ServerError } = require('../helpers/error.res.helper');
const CODES = require('../utils/code.http');
const { FolderPaths } = require('../utils/multer.util');

/**
 * Multer Base
 */
class Multer {
    multerInstance = null;

    /* Instance */
    constructor({ path }) {
        /**
         * Set up storage and multer instance
         */
        const storage = this.#setStorage({ folderPath: path });
        this.multerInstance = this.#setMulter({ storage });
    }

    /**
     * @desc set up storage where to save file
     */
    #setStorage({ folderPath }) {
        /* Init storage */
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                /* Create folder if has not been existed */
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                /* Init folder path */
                callback(null, folderPath);
            },

            filename: (req, file, callback) => {
                /* Generate unique suffix */
                const uniqueSuffix = `${Date.now()}-${Math.round(
                    Math.random() * 1e9
                )}`;
                /* File extention */
                const fileExt = path.extname(file.originalname);
                /* Init file */
                callback(
                    null,
                    `${file.fieldname}-${uniqueSuffix}${fileExt}`
                );
            },
        });

        return storage;
    }

    /**
     * @desc set uo multer instance
     */
    #setMulter({ storage }) {
        const multerInstance = multer({
            storage,
            limits: {
                fileSize: 20 * 1024 * 1024,
            },
            fileFilter: (req, file, cb) => {
                if (
                    file.mimetype.startsWith('image/') ||
                    file.mimetype.startsWith('video/')
                ) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
            },
        });

        return multerInstance;
    }
}

/**
 * Multer variants
 */

/* Avatar Multer */
class AvatarMulter extends Multer {
    constructor() {
        super({ path: FolderPaths.AVATAR.absolutePath });
        this.relativePath = FolderPaths.AVATAR.relativePath;
    }
}

/* Product Multer */
class ProductMulter extends Multer {
    constructor() {
        super({ path: FolderPaths.PRODUCT.absolutePath });
        this.relativePath = FolderPaths.PRODUCT.relativePath;
    }
}

/* Feedback Multer */
class FeedbackMulter extends Multer {
    constructor() {
        super({ path: FolderPaths.FEEDBACK.absolutePath });
        this.relativePath = FolderPaths.FEEDBACK.relativePath;
    }
}

/**
 * Multer Context
 *  (Strategy pattern)
 */
class MulterContext {
    static contexts = {
        avatar: new AvatarMulter(),
        product: new ProductMulter(),
        feedback: new FeedbackMulter(),
    };

    /**
     * @desc upload the file
     * @param {string} context
     */
    static getContext({ context }) {
        const instance = MulterContext.contexts[context.toLowerCase()];
        if (!instance) {
            throw new Error(
                `The multer context [${context}] doesn't exist`
            );
        }

        /* Return context */
        return instance;
    }
}

/**
 * Multer services
 */
/* Define the service */
class MulterServices {
    static async uploadMany({ req, res, context }) {
        /* Get multer instance */
        const instance = MulterContext.getContext({ context });
        const multerInstance = instance.multerInstance;

        /* Upload process */
        const files = await new Promise((resolve, reject) => {
            multerInstance.any()(req, res, (error) => {
                /* Multer error */
                if (error instanceof multer.MulterError) {
                    reject(
                        new ServerError({
                            message: 'Fail to upload file',
                            code: CODES.MULTER_ERROR,
                        })
                    );
                }

                /* Other errors */
                if (error) {
                    reject(
                        new ServerError({
                            message: 'Fail to upload file',
                            code: CODES.UPLOAD_IMAGE_FAIL,
                        })
                    );
                }

                resolve(req?.files);
            });
        }).catch((error) => {
            throw error;
        });

        if (!files || (files && files.length == 0)) {
            return undefined;
        }

        /* Generate file urls */
        const relativeFilePaths = [];
        for (let i = 0; i < files.length; i++) {
            const relativeFilePath = `${instance.relativePath}/${files[i].filename}`;
            relativeFilePaths.push(relativeFilePath);
        }

        /* Return file urls */
        return relativeFilePaths;
    }

    static async uploadSingle({ req, res, context, fieldName }) {
        /* Get multer instance */
        const instance = MulterContext.getContext({ context });
        const multerInstance = instance.multerInstance;

        /* Upload process */
        const file = await new Promise((resolve, reject) => {
            multerInstance.single(fieldName)(req, res, (error) => {
                /* Multer error */
                if (error instanceof multer.MulterError) {
                    reject(
                        new ServerError({
                            message: 'Fail to upload file',
                            code: CODES.MULTER_ERROR,
                        })
                    );
                }

                /* Other errors */
                if (error) {
                    reject(
                        new ServerError({
                            message: 'Fail to upload file',
                            code: CODES.MULTER_UPLOAD_FAIL,
                        })
                    );
                }

                resolve(req?.file);
            });
        }).catch((error) => {
            throw error;
        });

        /* Generate file urls */
        const relativeFilePath = `${instance.relativePath}/${file.filename}`;

        /* Return file urls */
        return relativeFilePath;
    }
}

/**
 * Export service
 */
module.exports = MulterServices;
