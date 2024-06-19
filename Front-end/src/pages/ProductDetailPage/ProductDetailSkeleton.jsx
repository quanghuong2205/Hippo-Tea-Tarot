function ProductDetailSkeleton() {
    return (
        <div className='product-detail__main'>
            <div className='row'>
                {/* Product thumbs */}
                <div className='col-6 col-lg-12'>
                    <div className='product-media'>
                        <div className='product-media__preview d-md-none'>
                            <div className='skeleton'></div>
                            <div className='skeleton'></div>
                            <div className='skeleton'></div>
                        </div>

                        <div className='product-media__image-slides skeleton'>
                            <div className='product-media__image-slide'></div>
                        </div>
                    </div>
                </div>

                {/* Product Infor */}
                <div className='col-6 col-lg-12 product-infor-wrap'>
                    <div className='product-infor'>
                        <h3 className='product-infor__heading skeleton-heading'></h3>
                        <p className='product-infor__desc skeleton-text'></p>

                        <div className='product-infor__attrs'>
                            <div className='product-attr'>
                                <span className='product-attr__name skeleton'></span>
                                <div className='product-attr__values'>
                                    <span className='product-attr__value skeleton'></span>
                                    <span className='product-attr__value skeleton'></span>
                                    <span className='product-attr__value skeleton'></span>
                                </div>
                            </div>

                            <div className='product-attr'>
                                <span className='product-attr__name skeleton'></span>
                                <div className='product-attr__values'>
                                    <span className='product-attr__value skeleton'></span>
                                    <span className='product-attr__value skeleton'></span>
                                    <span className='product-attr__value skeleton'></span>
                                </div>
                            </div>
                        </div>

                        <div
                            className='product-infor__card skeleton'
                            style={{
                                height: '190px',
                            }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailSkeleton;
