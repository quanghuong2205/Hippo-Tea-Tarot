import PropTypes from 'prop-types';
import images from '../../images';
import clsx from 'clsx';

function Image({ src, alt, className, options = {} }) {
    const roundStyle = {
        borderRadius: '50%',
    };

    return (
        <img
            src={src ? src : images.placeholder}
            alt={alt || 'No alt'}
            className={clsx({
                [className]: true,
                fit: options?.fit,
            })}
            style={{
                ...(options?.round ? roundStyle : {}),
            }}
        />
    );
}

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.object,
};

export default Image;
