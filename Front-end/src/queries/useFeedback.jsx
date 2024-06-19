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
import { isFinishedMutate, isReady } from '.';
// import { useQueryClient } from 'react-query';

function useFeedbacks({ searchParamObjects, productID }) {
    const props = useQuery({
        queryKey: `${QUERY_KEYS.FEEDBACK_ALL_KEY}/${productID}`,
        queryFn: async () =>
            await getFeedbacksApi({ searchParamObjects, productID }),
    });

    return {
        ...props,
        isReady: isReady({
            isFetching: props.isFetching,
            isLoading: props.isLoading,
            data: props.data,
            isSuccess: props.isSuccess,
        }),
    };
}

function useFeedback({ productID }) {
    return useQuery({
        queryKey: `${QUERY_KEYS.FEEDBACK_SINGLE_KEY}/${productID}`,
        queryFn: async () => await getFeedbackApi({ productID }),
    });
}

function useCreateFeedback() {
    const props = useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_CREATE,
        mutationFn: createFeedbackApi,
    });

    return {
        ...props,
        isFinished: isFinishedMutate({
            isError: props.isError,
            error: props.error,
            isSuccess: props.isSuccess,
            isLoading: props.isLoading,
        }),
    };
}

function useUpdateFeedback() {
    const props = useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_UPDATE,
        mutationFn: updateFeedbackApi,
    });

    return {
        ...props,
        isFinished: isFinishedMutate({
            isError: props.isError,
            error: props.error,
            isSuccess: props.isSuccess,
            isLoading: props.isLoading,
        }),
    };
}

function useDeleteFeedback() {
    const props = useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_DELETE,
        mutationFn: deleteFeedbackApi,
    });

    return {
        ...props,
        isFinished: isFinishedMutate({
            isError: props.isError,
            error: props.error,
            isSuccess: props.isSuccess,
            isLoading: props.isLoading,
        }),
    };
}

function useLikeFeedback() {
    const props = useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_LIKE,
        mutationFn: likeFeedbackApi,
    });

    return {
        ...props,
        isFinished: isFinishedMutate({
            isError: props.isError,
            error: props.error,
            isSuccess: props.isSuccess,
            isLoading: props.isLoading,
        }),
    };
}

function useUnlikeFeedback() {
    const props = useMutation({
        mutationKey: MUTATE_KEYS.FEEDBACK_UNLIKE,
        mutationFn: unLikeFeedbackApi,
    });

    return {
        ...props,
        isFinished: isFinishedMutate({
            isError: props.isError,
            error: props.error,
            isSuccess: props.isSuccess,
            isLoading: props.isLoading,
        }),
    };
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
