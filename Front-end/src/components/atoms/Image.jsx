import PropTypes from 'prop-types';
import images from '../../../assets/img';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

function Image({ src, alt, className, options = {} }) {
    const [url, setUrl] = useState(src);
    const ref = useRef(null);

    useEffect(() => {
        /* Fail to load image */
        ref.current.onerror = () => {
            setUrl(images.placeholder);
        };
    }, []);

    return (
        <img
            src={url}
            ref={ref}
            alt={alt || 'No alt'}
            className={clsx({
                [className]: true,
                fit: options?.fit,
                round: options.round,
            })}
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
