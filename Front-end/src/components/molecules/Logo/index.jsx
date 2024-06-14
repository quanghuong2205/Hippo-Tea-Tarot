import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import images from '../../../images';
import Image from '../../atoms/Image';

function Logo({ slogan }) {
    return (
        <div className='logo'>
            <Link
                to={'/'}
                className='logo'>
                <Image
                    src={images.avatar}
                    alt={'Hippo'}
                    className={'logo__image'}
                />
            </Link>

            {slogan && <p className='logo__slogan'>{slogan}</p>}
        </div>
    );
}

Logo.propTypes = {
    slogan: PropTypes.string,
};

export default Logo;
