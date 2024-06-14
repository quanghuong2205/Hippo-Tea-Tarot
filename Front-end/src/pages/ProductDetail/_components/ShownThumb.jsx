import PropTypes from 'prop-types';
import Image from '../../../components/atoms/Image';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import config from '../../../../configs';

function ShownThumb({ thumbs }) {
    return (
        <div
            className='product-media__image-slides'
            style={{
                position: 'relative',
            }}>
            <div className='controll-btn back-btn'>
                <FaArrowLeftLong />
            </div>

            <div className='controll-btn next-btn'>
                <FaArrowRightLong />
            </div>
            <div className='product-media__image-slide'>
                <Image
                    src={`${config.SERVER_URL}/${thumbs[0]}`}
                    alt={'product'}
                    className={'product-media__image'}
                />
            </div>
        </div>
    );
}

ShownThumb.propTypes = {
    thumbs: PropTypes.array,
};

export default ShownThumb;
