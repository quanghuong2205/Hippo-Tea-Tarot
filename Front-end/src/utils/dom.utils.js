'use strict';
const getCoords = ({ node }) => {
    const coords = node.getBoundingClientRect();

    return {
        left: coords.x,
        top: coords.y,
        right: coords.right,
        bottom: coords.bottom,
    };
};

export { getCoords };
