'use strict';
import { jwtDecode } from 'jwt-decode';
import { v4 } from 'uuid';

const appendPrefix = ({ prefix, object = {} }) => {
    let keys = Object.keys(object);
    keys.forEach((key) => (object[key] = `${prefix}/${object[key]}`));
    return object;
};

const formQueryString = ({ paramObject }) => {
    const paramKeys = Object.keys(paramObject);
    const formatedParams = {};
    /**
     * Encode all quey params
     */
    paramKeys.forEach((key) => {
        if (Array.isArray(paramObject[key])) {
            formatedParams[key] = paramObject[key].join(', ');
            return;
        }

        formatedParams[key] = paramObject[key];
    });

    /**
     * Pasrse to query string by
     */
    return new URLSearchParams(formatedParams).toString();
};

const parseQueryString = ({ queryString, selectedParams = [] }) => {
    const searchParams = new URLSearchParams(queryString);
    const results = {};
    selectedParams.forEach((selectedParam) => {
        results[selectedParam] = searchParams.get(selectedParam);
    });

    return results;
};

const decodeToken = ({ token }) => jwtDecode(token);

const convertMapToObject = (map) => {
    const result = {};
    for (const [key, value] of map) {
        result[key] = value;
    }

    return result;
};

const createRandomArray = ({ size }) => {
    if (!size) return [];

    const result = [];
    for (let i = 1; i <= size; i++) {
        result.push(v4());
    }

    return result;
};

const roundNumber = ({ num }) => {
    const remainder = num % 1;

    if (remainder === 0) return num;

    if (remainder <= 0.25) {
        return Math.floor(num);
    }

    if (remainder > 0.25 && remainder <= 0.75) {
        return Math.floor(num) + 0.5;
    }

    if (remainder > 0.75) {
        return Math.ceil(num);
    }
};

const getPricePlusTax = ({ price, tax }) => {
    return price + (price * tax) / 100;
};

const convertObjectToFormData = ({ obj = {} }) => {
    const formData = new FormData();
    for (const key in obj) {
        const value = obj[key];
        if (Array.isArray(value)) {
            value.forEach((file) => {
                formData.append(key, file);
            });
        } else {
            formData.append(key, value);
        }
    }
    return formData;
};

const dispatchEvent = ({ eventName, payload }) => {
    const customEvent = new CustomEvent(eventName, {
        detail: payload,
    });

    window.dispatchEvent(customEvent);
};

const formatMoney = ({ money }) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const saveToLocalstorage = ({ key, data }) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const extractFromLocalstorage = ({ key }) => {
    return JSON.parse(localStorage.getItem(key));
};

export {
    appendPrefix,
    decodeToken,
    parseQueryString,
    convertMapToObject,
    createRandomArray,
    roundNumber,
    getPricePlusTax,
    formQueryString,
    convertObjectToFormData,
    dispatchEvent,
    formatMoney,
    saveToLocalstorage,
    extractFromLocalstorage,
};
