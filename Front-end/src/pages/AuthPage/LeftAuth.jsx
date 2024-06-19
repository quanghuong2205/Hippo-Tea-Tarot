import Image from '../../components/atoms/Image';
import images from '../../../assets/img';

function LeftAuth() {
    return (
        <div className='auth-left d-md-none'>
            <div className='auth-left__inner'>
                <div className='auth-left__media'>
                    <Image
                        src={images.avatar}
                        alt={'Hippo'}
                    />
                </div>

                <h2 className='auth-left__desc'>
                    HIPPO - Nơi lắng nghe, đồng hành và an toàn nhất của
                    bạn
                </h2>
            </div>
        </div>
    );
}

export default LeftAuth;
