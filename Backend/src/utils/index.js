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

module.exports = {
    selectPropsInObject,
    selectProps,
    unSelectProps,
    unSelectPropsInObject,
};
