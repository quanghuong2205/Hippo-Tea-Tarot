import { useMutation, useQuery } from 'react-query';
import { QUERY_KEYS, MUTATE_KEYS } from '../constants/query-key.constant';
import {
    getFeedbacksApi,
    updateReplyApi,
    createFeedbackApi,
    getFeedbackApi,
    updateFeedbackApi,
    deleteFeedbackApi,
    likeFeedbackApi,
    unLikeFeedbackApi,
} from '../apis/feedback.api';
// import { useQueryClient } from 'react-query';

function useFeedbacks({ searchParamObjects, productID }) {
    return useQuery({
        queryKey: `${QUERY_KEYS.FEEDBACK_ALL_KEY}/${productID}`,
        queryFn: async () =>
            await getFeedbacksApi({ searchParamObjects, productID }),
    });
}

function useFeedback({ productID }) {
    return useQuery({
        queryKey: `${QUERY_KEYS.FEEDBACK_SINGLE_KEY}/${productID}`,
        queryFn: async () => await getFeedbackApi({ productID }),
    });
}

function useCreateFeedback() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_CREATE,
        mutationFn: createFeedbackApi,
    });
}

function useUpdateFeedback() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_UPDATE,
        mutationFn: updateFeedbackApi,
    });
}

function useDeleteFeedback() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_DELETE,
        mutationFn: deleteFeedbackApi,
    });
}

function useLikeFeedback() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_LIKE,
        mutationFn: likeFeedbackApi,
    });
}

function useUnlikeFeedback() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_UNLIKE,
        mutationFn: unLikeFeedbackApi,
    });
}

function useUpdateReply() {
    return useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_UPDATE_REPLY,
        mutationFn: updateReplyApi,
    });
}

export {
    useFeedbacks,
    useUpdateReply,
    useCreateFeedback,
    useFeedback,
    useUpdateFeedback,
    useDeleteFeedback,
    useLikeFeedback,
    useUnlikeFeedback,
};
