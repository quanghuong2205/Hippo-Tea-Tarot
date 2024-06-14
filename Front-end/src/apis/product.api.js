'use strict';
import { formQueryString } from '../utils';
import apiBase from './base.api';

/* [GET] /product/publish */
const getPublishedProductsApi = async ({ searchParamObjects }) => {
    const queryString = formQueryString({
        paramObject: searchParamObjects,
    });
    return await apiBase.get(`/product/publish?${queryString}`);
};

/* [GET] /product/publish */
const getDraftProductsApi = async ({
    searchParamObjects,
    limit = 8,
    page = 1,
}) => {
    const queryString = formQueryString({
        paramObject: { ...searchParamObjects, limit, page },
    });
    return await apiBase.get(`/product/draft?${queryString}`);
};

/* [GET] /product/publish/:id */
const getPublishedProductApi = async ({ id }) => {
    return await apiBase.get(`/product/publish/${id}`);
};

/* [GET] /product/draft/:id */
const getDraftProductApi = async ({ id }) => {
    return await apiBase.get(`/product/draft/${id}`);
};

/* [GET] /product/publish/category/:cat */
const getPublishedProductByCatApi = async ({
    cat,
    searchParamObjects,
}) => {
    const queryString = formQueryString({
        paramObject: searchParamObjects,
    });
    return await apiBase.get(
        `/product/publish/category/${cat}?${queryString}`
    );
};

/* [POST] /product */
const createProductApi = async ({ formData }) => {
    return await apiBase.post('/product', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

/* [DELETE] /product/:id */
const deleteProductApi = async ({ id }) => {
    return await apiBase.delete(`/product/${id}`);
};

/* [PATCH] /product/:id */
const updateProductApi = async ({ formData, id }) => {
    return await apiBase.patch(`/product/${id}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export {
    getPublishedProductsApi,
    getDraftProductsApi,
    getPublishedProductApi,
    getDraftProductApi,
    getPublishedProductByCatApi,
    createProductApi,
    deleteProductApi,
    updateProductApi,
};
