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

const matchAttributes = ({
    node = document.querySelector(),
    attributes = [],
}) => {
    if (attributes.length === 0) {
        return false;
    }

    for (let i = 0; i < attributes.length; i++) {
        const { name, value } = attributes[i];
        if (
            !node.getAttribute(name) ||
            node.getAttribute(name).toString() !== value.toString()
        ) {
            return false;
        }

        continue;
    }

    return true;
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

export { getCoords, getParentNode, matchAttributes };
