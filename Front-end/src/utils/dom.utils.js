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

const getParentNode = ({
    parentClassName,
    parentId,
    node = document.querySelector(),
}) => {
    let parentNode = node.parentElement;
    if (!parentNode) return undefined;

    while (parentNode) {
        parentNode = parentNode.parentElement;
        if (!parentNode) return undefined;
        if (
            parentNode.classList.contains(parentClassName) ||
            parentNode.id === parentId
        ) {
            return parentNode;
        }
    }

    return undefined;
};

export { getCoords, getParentNode };
