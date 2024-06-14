'use strict';
const ProductModel = require('../models/product.model');

/* Define the repo */
class SearchRepo {
    static async searchProducts({ searchPhrase }) {
        return await ProductModel.find(
            { $text: { $search: searchPhrase } },
            { score: { $meta: 'textScore' } }
        ).sort({
            score: { $meta: 'textScore' },
        });
    }
}

/* Export the repo */
module.exports = SearchRepo;
