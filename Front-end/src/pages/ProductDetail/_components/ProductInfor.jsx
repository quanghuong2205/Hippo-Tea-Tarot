import PropTypes from 'prop-types';
import { formatMoney, getPricePlusTax } from '../../../utils';
import { FaMinus, FaPlus } from 'react-icons/fa6';
function ProductInfor({ product }) {
    const attrGroups = product?.attributes;
    const attrGroupKeys = attrGroups ? Object.keys(attrGroups) : null;

    return (
        <div className='col-6 col-lg-12 product-infor-wrap'>
            <div className='product-infor'>
                {/* Product header */}
                <h3 className='product-infor__heading'>{product.name}</h3>
                <p className='product-infor__desc'>
                    {product.description}
                </p>

                {/* Product Attributes */}
                {attrGroups && (
                    <div className='product-infor__attrs'>
                        {attrGroupKeys.map((grKey, index) => (
                            <div
                                key={`gr/${index}`}
                                className='product-attr'>
                                <span className='product-attr__name'>
                                    {grKey}
                                </span>
                                <div className='product-attr__values'>
                                    {!Array.isArray(attrGroups[grKey]) ? (
                                        <span
                                            key={`attr/${attrGroups[grKey]}`}
                                            className='product-attr__value'>
                                            {attrGroups[grKey]}
                                        </span>
                                    ) : (
                                        attrGroups[grKey].map((attr) => (
                                            <span
                                                key={`${attr}/${index}`}
                                                className='product-attr__value'>
                                                {attr}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className='product-attr'>
                            <span className='product-attr__name'>
                                Quantity
                            </span>

                            <div className='product-attr__group'>
                                <button className='product-attr__act-btn'>
                                    <FaMinus />
                                </button>
                                <span className='product-attr__value'>
                                    10
                                </span>
                                <button className='product-attr__act-btn'>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product price */}
                <div className='product-infor__card'>
                    <div className='product-infor__row product-infor__row--center'>
                        <div className='product-infor__price'>
                            <span className='product-infor__price--new'>
                                {formatMoney({
                                    money: product.price,
                                })}
                            </span>
                            <span className='product-infor__price--old'>
                                125.000
                            </span>
                        </div>
                        <span className='product-infor__tax'>
                            {product.tax}%
                        </span>
                    </div>

                    <div className='product-infor__row'>
                        <div className='product-infor__total-price'>
                            <span className='product-infor__total-price--new'>
                                {formatMoney({
                                    money: getPricePlusTax({
                                        price: product.price,
                                        tax: product.tax,
                                    }),
                                })}
                            </span>

                            <span className='product-infor__total-price--old'>
                                120.000
                            </span>
                        </div>
                    </div>

                    <div className='product-infor__row'>
                        <button className='pri-btn product-infor__order-btn'>
                            Order now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductInfor.propTypes = {
    product: PropTypes.object,
};

export default ProductInfor;
