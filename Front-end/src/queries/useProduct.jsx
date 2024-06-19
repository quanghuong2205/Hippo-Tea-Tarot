import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/query-key.constant';
import {
    getPublishedProductsApi,
    getPublishedProductApi,
    getPublishedProductByCatApi,
} from '../apis/product.api';
import { useQueryClient } from 'react-query';
import { isReady } from '.';

function usePublishProducts({ searchParamObjects }) {
    const queryKey = `${QUERY_KEYS.PRODUCTS_PUBLISH_KEY}/${searchParamObjects['page']}`;

    const props = useQuery({
        queryKey,
        queryFn: async () =>
            await getPublishedProductsApi({ searchParamObjects }),
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

function usePublishProductByCat({ category, id, searchParamObjects }) {
    const queryKey = `${QUERY_KEYS.PRODUCT_PUBLISH_BY_CAT_KEY}/${category}}`;
    const props = useQuery({
        queryKey,
        queryFn: async () =>
            await getPublishedProductByCatApi({
                cat: category,
                searchParamObjects,
            }),

        select: (data) => {
            if (!data) return undefined;
            return {
                ...data,
                products: data.products.filter((p) => p._id !== id),
            };
        },
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

function usePublishProduct({ id }) {
    const queryClient = useQueryClient();

    const props = useQuery({
        queryKey: `${QUERY_KEYS.PRODUCT_PUBLISH_KEY}/${id}`,
        queryFn: async () => await getPublishedProductApi({ id }),
        placeholderData: () => {
            const cachedProducts = queryClient.getQueryData(
                QUERY_KEYS.PRODUCT_PUBLISH_KEY
            )?.body;
            const product = cachedProducts?.find((p) => p._id === id);
            return !product ? undefined : product;
        },
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

export { usePublishProducts, usePublishProduct, usePublishProductByCat };
