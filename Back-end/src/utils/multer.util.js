'use strict';

const root = process.cwd();
const prefix = `${root}/src`;

/**
 * Paths to save files
 */
const RelativePaths = {
    AVATAR: 'assets/avatar',
    PRODUCT: 'assets/product',
    FEEDBACK: 'assets/feedback',
};

/**
 * @desc Set up absolute path of each file
 *   based on root path
 */
const SetUpPaths = () => {
    const Paths = {};
    const keys = Object.keys(RelativePaths);

    /* Generate absolute paths based on relative path */
    keys.forEach((key) => {
        const relativePath = RelativePaths[key];
        Paths[key] = {
            relativePath,
            absolutePath: `${prefix}/${relativePath}`,
        };
    });

    return Paths;
};
const FolderPaths = SetUpPaths();

/**
 * @desc Get absolute path based on relative path
 * @returns absolute path
 */
const getAbsolutePath = ({ relativePath }) => {
    return `${prefix}/${relativePath}`;
};

module.exports = {
    FolderPaths,
    getAbsolutePath,
};
