const POSITION_STYLES = {
    TOP: {
        top: 0,
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
    },

    LEFT: {
        top: 'auto',
        left: 0,
        right: 'auto',
        bottom: 'auto',
    },

    RIGHT: {
        top: 'auto',
        left: 'auto',
        right: 0,
        bottom: 'auto',
    },

    BOTTOM: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 0,
    },

    TOP_RIGHT: {
        top: 0,
        left: 'auto',
        right: 0,
        bottom: 'auto',
    },

    TOP_LEFT: {
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto',
    },

    BOTTOM_RIGHT: {
        top: 'auto',
        left: 'auto',
        right: 0,
        bottom: 0,
    },

    BOTTOM_LEFT: {
        top: 'auto',
        left: 0,
        right: 'auto',
        bottom: 0,
    },
};

const getPosStyle = ({
    leftSpace = 0,
    pos = null,
    isCenter = false,
}) => {
    const STYLE = POSITION_STYLES[pos.toUpperCase()];

    if (!STYLE) {
        throw new Error(`Position ${pos} does not exist`);
    }

    /* Handle space */

    /* Handle center */
};
