'use strict';

const CODES = require('./code.http');
const { BadRequestError } = require('./error.response.util');

const convertToMultiFilterConditions = ({
    key,
    valueString,
    dataType = 'string',
}) => {
    if (!key || !valueString) {
        return {};
    }

    const result = [];
    const values = valueString.split(', ');

    for (let i = 0; i < values.length; i++) {
        const condition = {
            [key]: dataType === 'number' ? parseInt(values[i]) : values[i],
        };

        result.push(condition);
    }

    return {
        $or: result,
    };
};

const convertToRangeCondition = ({ minRange, maxRange, key }) => {
    const undefinedValues = [null, undefined];
    if (
        undefinedValues.includes(minRange) ||
        undefinedValues.includes(maxRange)
    ) {
        return {};
    }

    return {
        [key]: {
            $gte: parseFloat(minRange),
            $lte: parseFloat(maxRange),
        },
    };
};

const checkMongoID = ({ id, message }) => {
    const isValid = id && id.length == 24 && /^[0-9a-fA-F]{24}$/.test(id);
    if (!isValid) {
        throw new BadRequestError({
            message: message || 'The ID is not valid',
            code: CODES.MONGODB_INVALID_ID,
        });
    }
};

module.exports = {
    convertToMultiFilterConditions,
    convertToRangeCondition,
    checkMongoID,
};
