'use strict';

const {
    ServerError,
    ForbiddenError,
} = require('../utils/error.response.util');
const CODES = require('../utils/code.http');
const MulterServices = require('./multer.service');
const UserRepo = require('../repositories/user.repo');
const FileServices = require('./file.service');
const { getAbsolutePath } = require('../utils/multer.util');

/* Define the service */
class UploadServices {
    /**
     * @warining is doing ... (... is considering to use transaction)
     * @returns
     */
    static async uploadAvatar(req, res) {
        /**
         * Get stale avatar url
         */
        const staleUserObject = await UserRepo.findUserByID({
            userID: req.clientID,
        });

        if (!staleUserObject) {
            throw new ForbiddenError({
                code: CODES.USER_NOT_EXISTED,
            });
        }

        const staleAvatarUrl = staleUserObject.avatar;

        /**
         * Remove stale atavar url
         *  if exist
         */
        if (staleAvatarUrl && staleAvatarUrl !== '') {
            await FileServices.removeSingleFile({
                relativePath: staleAvatarUrl,
            });
        }

        /**
         * Upload the new avatar
         */
        const relativeFilePath = await MulterServices.uploadSingle({
            req,
            res,
            context: 'avatar',
            fieldName: 'avatar',
        });

        /**
         * Save new avatar url to the database
         */
        const userObject = await UserRepo.updateAvatarUrl({
            userID: req.clientID,
            avatarUrl: relativeFilePath,
        });

        /**
         * Remove avatar url if fail to
         *    update the database
         */
        if (!userObject) {
            /* Delete file */
            await FileServices.removeSingleFile({
                absolutePath: getAbsolutePath({
                    relativePath: relativeFilePath,
                }),
            });

            /* Throw error */
            throw new ServerError({
                message: 'Fail to upload file',
                code: CODES.FAIL_TO_UPDATE_DOCUMENT,
            });
        }

        /* Return file information */
        return {
            fileUrl: userObject.avatar,
        };
    }
}

/**
 * Export service
 */
module.exports = UploadServices;
