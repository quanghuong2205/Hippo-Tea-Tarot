import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import Image from '../../atoms/Image';
import config from '../../../../configs';
import Rating from '../Rating';
import { formatMoney } from '../../../utils';

function Product({ product, className }) {
    return (
        <div className={className || 'col-3 gy-3 col-lg-4 col-md-6'}>
            <article className='product-card'>
                {product.is_best_seller && (
                    <div className='product-card__label'>
                        <span>Bán chạy</span>
                    </div>
                )}

                <div className='product-card__media'>
                    <Button
                        linkTo={`/product-detail/${product.category}/${product._id}`}
                        urlState={{
                            category: product.category,
                        }}>
                        <Image
                            src={
                                product.thumbs[0] &&
                                `${config.SERVER_URL}/${product.thumbs[0]}`
                            }
                            alt={product.name}
                            className={'product-card__image'}
                        />
                    </Button>
                </div>

                <div className='product-card__infor'>
                    <Button
                        linkTo={`/product-detail/${product.category}/${product._id}`}>
                        <h3
                            className='product-card__title line-clamp'
                            style={{
                                '--line-clamp': 2,
                            }}>
                            {product.name}
                        </h3>
                    </Button>

                    <div className='product-card__footer'>
                        <div className='product-card__price'>
                            <span className='product-card__price--new'>
                                {formatMoney({
                                    money: product.price,
                                })}
                                <span className='product-card__price__label'>
                                    đ
                                </span>
                            </span>

                            <span className='product-card__price--old'>
                                125.000
                                <span className='product-card__price__label'>
                                    đ
                                </span>
                            </span>
                        </div>

                        <Rating
                            rating={product.rating}
                            className={'product-card__rating'}
                        />

                        <div className='product-card__status'>
                            Đang kinh doanh
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}

Product.propTypes = {
    product: PropTypes.object,
    className: PropTypes.string,
};

export default Product;
