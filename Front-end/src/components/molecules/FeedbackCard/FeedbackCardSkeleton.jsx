function FeedbackCardSkeleton() {
    return (
        <div className='review-card'>
            <div className='review-card__top'>
                <div className='review-card__user'>
                    <div className='review-card__avatar skeleton-round'></div>
                </div>

                <div className='review-card__infor skeleton-fit-width'>
                    <span className='review-card__name skeleton-text'></span>

                    <div className='review-card__stars skeleton-text'></div>

                    <span className='review-card__time skeleton-text'></span>

                    <p className='review-card__title skeleton-text'></p>

                    <p
                        className='review-card__content skeleton-text'
                        style={{
                            height: '70px',
                        }}></p>

                    <div className='review-card__images'>
                        <div className='review-card__image skeleton'></div>
                        <div className='review-card__image skeleton'></div>
                        <div className='review-card__image skeleton'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackCardSkeleton;
