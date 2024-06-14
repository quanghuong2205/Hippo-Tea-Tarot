import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/query-key.constant';
import {
    getPublishedProductsApi,
    getPublishedProductApi,
    getPublishedProductByCatApi,
} from '../apis/product.api';
import { useQueryClient } from 'react-query';

function usePublishProducts({ searchParamObjects }) {
    const queryKey = `${QUERY_KEYS.PRODUCTS_PUBLISH_KEY}/${searchParamObjects['page']}`;
    return useQuery({
        queryKey,
        queryFn: async () =>
            await getPublishedProductsApi({ searchParamObjects }),
    });
}

function usePublishProductByCat({ category, id, searchParamObjects }) {
    const queryKey = `${QUERY_KEYS.PRODUCT_PUBLISH_BY_CAT_KEY}/${category}}`;
    return useQuery({
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
}

function usePublishProduct({ id }) {
    const queryClient = useQueryClient();

    return useQuery({
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
}

export { usePublishProducts, usePublishProduct, usePublishProductByCat };
