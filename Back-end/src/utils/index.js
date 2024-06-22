'use strict';
/**
 * @desc select targeted props in the object
 *      and remove the rest
 * @param {Object} object
 * @param {Array} props
 */
const selectPropsInObject = ({ object = {}, props = [] }) => {
    const modifiedObject = {};
    props.forEach((prop) => {
        modifiedObject[prop] = object[prop];
    });

    return modifiedObject;
};

/**
 * @desc unselect targeted props in the object
 *      and remain the rest
 * @param {Object} object
 * @param {Array} props
 */
const unSelectPropsInObject = ({ object = {}, props = [] }) => {
    const modifiedObject = { ...object };
    props.forEach((prop) => {
        /* Delete the prop */
        delete modifiedObject[prop];
    });

    return modifiedObject;
};

/**
 * @desc Convert selected props to the format
 *      [propKey, 1]
 * @param {Array} props
 */
const selectProps = (props) => {
    props = props.map((prop) => [prop, 1]);
    return Object.fromEntries(props);
};

/**
 * @desc Convert unselected props to the format
 *      [propKey, 0]
 * @param {Array} props
 */
const unSelectProps = (props) => {
    props = props.map((prop) => [prop, 0]);
    return Object.fromEntries(props);
};

/**
 * @desc check subset of an array
 */

const isSubSet = ({ child = [], parent = [] }) => {
    const childLen = child.length;
    const parentLen = parent.length;

    if (childLen > parentLen || childLen < 0 || parentLen < 0) {
        return false;
    }

    for (let i = 0; i < childLen; i++) {
        if (!parent.includes(child[i])) {
            return false;
        }
    }

    return true;
};

/**
 * @desc Get skip index
 */
const getSkip = ({ page, limit }) => {
    if (parseInt(page) === 0) return 0;
    return (page - 1) * limit;
};

/**
 * @desc Find max value in array
 */
const findMaxInArray = ({ arr }) => {
    return Math.max(...arr);
};

/**
 * @desc Remove null or undefined props in the object
 */
const removeNullOrUndefinedProps = (obj = {}) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (!obj[key]) {
            delete obj[key];
        }

        if (obj[key] && typeof obj[key] === 'object') {
            removeNullOrUndefinedProps(obj[key]);
        }
    });

    return obj;
};

/**
 *
 * @desc Append the prefxix to each prop of the object
 */
const appendPrefixToProps = (prefix, obj) => {
    if (!prefix) return obj;

    const keys = Object.keys(obj);
    keys.forEach((key) => {
        obj[`${prefix}.${key}`] = obj[key];
        delete obj[key];
    });

    return obj;
};

/**
 *
 * @desc Flatten the object
 */
const flattenObject = ({ prefix = null, obj }) => {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (!obj[key]) continue;

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            const flatten = flattenObject({
                prefix: key,
                obj: obj[key],
            });

            delete obj[key];

            Object.assign(obj, {
                ...appendPrefixToProps(prefix, flatten),
            });

            continue;
        }

        if (!prefix) continue;

        obj[`${prefix}.${key}`] = obj[key];
        delete obj[key];
    }

    return obj;
};

const getPaginationInfor = ({ currentPage, totalItems, itemsPerPage }) => {
    if (!totalItems || totalItems === 0) {
        return {
            nextPage: null,
            prevPage: null,
            totalPages: null,
        };
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage !== 0 ? currentPage - 1 : null;

    return {
        nextPage,
        prevPage,
        totalPages,
    };
};

module.exports = {
    selectPropsInObject,
    selectProps,
    unSelectProps,
    unSelectPropsInObject,
    isSubSet,
    getSkip,
    findMaxInArray,
    removeNullOrUndefinedProps,
    flattenObject,
    getPaginationInfor,
};
