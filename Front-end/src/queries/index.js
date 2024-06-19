export const isReady = ({ isFetching, isLoading, data, isSuccess }) => {
    return !isFetching && !isLoading && isSuccess && data && true;
};

export const isFinishedMutate = ({
    isError,
    error,
    isSuccess,
    isLoading,
}) => {
    return !isLoading && !isError && !error && isSuccess;
};
