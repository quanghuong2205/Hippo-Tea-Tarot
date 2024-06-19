function FeedCardSkeleton() {
    return (
        <div className='feed-card'>
            <div className='feed-card__media skeleton'></div>
            <p className='feed-card__title skeleton-text'></p>
            <p className='feed-card__time skeleton-text'></p>
            <div className='feed-card__user skeleton-none'>
                <div className='feed-card__user__avatar skeleton-round'></div>
                <p className='feed-card__user__name skeleton-text'></p>
            </div>
        </div>
    );
}

export default FeedCardSkeleton;
