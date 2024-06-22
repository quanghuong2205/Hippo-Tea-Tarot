'use strict';
const multer = require('multer');

const multerInstance = multer({
    storage: multer.memoryStorage(),
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

module.exports = {
    parseMultipartForm: (req, res, next) =>
        multerInstance.any()(req, res, next),
};
