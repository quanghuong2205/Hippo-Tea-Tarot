'use strict';
const FILTERS = {
    CATEGORY: {
        title: 'Theo loại sản phẩm',
        isMultiple: true,
        body: [
            {
                label: 'Yogurt',
                queryObject: {
                    category: 'yogurt',
                },
            },

            {
                label: 'Machiato',
                queryObject: {
                    category: 'machiato',
                },
            },

            {
                label: 'Tea',
                queryObject: {
                    category: 'tea',
                },
            },

            {
                label: 'Ice blend',
                queryObject: {
                    category: 'ice blend',
                },
            },

            {
                label: 'Juice',
                queryObject: {
                    category: 'juice',
                },
            },

            {
                label: 'Topping',
                queryObject: {
                    category: 'topping',
                },
            },

            {
                label: 'Snack',
                queryObject: {
                    category: 'snack',
                },
            },
        ],
    },

    PRICE: {
        title: 'Khoảng giá',
        isMultiple: false,
        body: [
            {
                minPrice: '10000',
                maxPrice: '20000',
                queryObject: {
                    minPrice: 10000,
                    maxPrice: 20000,
                },
            },

            {
                minPrice: '20000',
                maxPrice: '30000',
                queryObject: {
                    minPrice: 20000,
                    maxPrice: 30000,
                },
            },

            {
                minPrice: '30000',
                maxPrice: '40000',
                queryObject: {
                    minPrice: 30000,
                    maxPrice: 40000,
                },
            },

            {
                minPrice: '40000',
                maxPrice: '50000',
                queryObject: {
                    minPrice: 40000,
                    maxPrice: 50000,
                },
            },
        ],
    },

    RATING: {
        title: 'Đánh Giá',
        isMultiple: true,
        body: [
            {
                score: 1,
                queryObject: {
                    rating: 1,
                },
            },

            {
                score: 2,
                queryObject: {
                    rating: 2,
                },
            },

            {
                score: 3,
                queryObject: {
                    rating: 3,
                },
            },

            {
                score: 4,
                queryObject: {
                    rating: 4,
                },
            },

            {
                score: 5,
                queryObject: {
                    rating: 5,
                },
            },
        ],
    },
};

export { FILTERS };
