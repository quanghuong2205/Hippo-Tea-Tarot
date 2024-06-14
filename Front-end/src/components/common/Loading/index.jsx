import PropTypes from 'prop-types';
import images from '../../../images';
function Loading({ loadingText = 'Loading...', isFixed }) {
    return (
        <div
            className='loading'
            style={{
                position: isFixed ? 'fixed' : 'relative',
                zIndex: isFixed ? 1000 : 1,
                inset: isFixed ? 0 : 'auto',
            }}>
            <div className='loading-image'>
                <img
                    src={images.avatar}
                    alt='Hippo'
                />
            </div>
            <div className='loading-text'>
                {loadingText.split('').map((char, index) => (
                    <span
                        key={char + index}
                        className='loading-text-words'
                        style={{
                            animation: `blur-text 1s ${
                                index / 5
                            }s infinite linear alternate`,
                        }}>
                        {char.toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );
}

Loading.propTypes = {
    loadingText: PropTypes.string,
    isFixed: PropTypes.bool,
};

export default Loading;
