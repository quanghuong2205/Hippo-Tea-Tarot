'use strict';
import { formQueryString } from '../utils';
import apiBase from './base.api';

/* [GET] /feedback/:pid */
const getFeedbacksApi = async ({ searchParamObjects, productID }) => {
    const queryString = formQueryString({
        paramObject: searchParamObjects,
    });
    return await apiBase.get(`/feedback/${productID}?${queryString}`);
};

/* [GET] /feedback?product= */
const getFeedbackApi = async ({ productID }) => {
    return await apiBase.get(`feedback?product=${productID}`);
};

/* [POST] /feedback/:id/like */
const likeFeedbackApi = async ({ id }) => {
    return await apiBase.post(`/feedback/${id}/like`);
};

/* [DELETE] /feedback/:id/like */
const unLikeFeedbackApi = async ({ id }) => {
    return await apiBase.delete(`/feedback/${id}/like`);
};

/* [POST] /feedback?product= */
const createFeedbackApi = async ({ formData, productID }) => {
    return await apiBase.post(`/feedback?product=${productID}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

/* [DELETE] /feedback/:id */
const deleteFeedbackApi = async ({ id }) => {
    return await apiBase.delete(`/feedback/${id}`);
};

/* [PATCH] /feedback/:id */
const updateFeedbackApi = async ({ formData, id }) => {
    return await apiBase.patch(`/feedback/${id}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

/* [POST] /reply/:id/reply */
const createReplyApi = async ({ replyText, id }) => {
    return await apiBase.post(
        `/feedback/${id}/reply`,
        { reply: replyText },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

/* [DELETE] /feedback/:id /reply*/
const deleteReplyApi = async ({ id }) => {
    return await apiBase.delete(`/feedback/${id}/reply`);
};

/* [PATCH] /feedback/:id /reply*/
const updateReplyApi = async ({ replyText, id }) => {
    return await apiBase.patch(
        `/feedback/${id}/reply`,
        { reply: replyText },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

export {
    getFeedbacksApi,
    getFeedbackApi,
    likeFeedbackApi,
    unLikeFeedbackApi,
    createFeedbackApi,
    deleteFeedbackApi,
    updateFeedbackApi,
    createReplyApi,
    deleteReplyApi,
    updateReplyApi,
};
