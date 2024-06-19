import PropTypes from 'prop-types';
import images from '../../../assets/img';
import clsx from 'clsx';
function MediaLoading({
    loadingText = 'Loading...',
    descText,
    isShownDescText,
    isFixed,
    styles = { bgColor: '#fff' },
}) {
    return (
        <div
            className={clsx({
                'loading-media': true,
                'loading-fixed': isFixed,
                'loading-absolute': !isFixed,
                'loading-center': true,
            })}
            style={{
                backgroundColor: styles.bgColor,
            }}>
            <div className='loading-media__image'>
                <img
                    src={images.avatar}
                    alt='Hippo'
                />
            </div>
            <div className='loading-media__text'>
                <div className='loading-media__main-text'>
                    {loadingText.split('').map((char, index) => (
                        <span
                            key={char + index}
                            className=''
                            style={{
                                animation: `blur-text 1s ${
                                    index / 5
                                }s infinite linear alternate`,
                            }}>
                            {char.toUpperCase()}
                        </span>
                    ))}
                </div>

                {isShownDescText && (
                    <span className='loading-media__desc-text'>
                        {descText}
                    </span>
                )}
            </div>
        </div>
    );
}

MediaLoading.propTypes = {
    loadingText: PropTypes.string,
    descText: PropTypes.string,
    isShownDescText: PropTypes.bool,
    isFixed: PropTypes.bool,
    styles: PropTypes.object,
};

export default MediaLoading;
