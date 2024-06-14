import PropTypes from 'prop-types';
import Image from '../../components/atoms/Image';
import images from '../../images';
import Popup from '../../components/common/Popup';

function AuthPopup({ signUpInfor, handleCloseSideEffects }) {
    return (
        <Popup
            hasCloseBtn
            closeOnOverlay
            handleCloseSideEffects={handleCloseSideEffects}>
            <div className='auth-popup'>
                <div className='auth-popup__photo'>
                    <Image
                        src={images.avatar}
                        options={{
                            fit: true,
                        }}
                    />
                </div>
                <div className='auth-popup__text'>
                    <h1>Chào mừng {signUpInfor.name} đến với SHOP</h1>
                    <p>
                        Chào mừng bạn đến với SHOP - nơi kết hợp giữa hương
                        vị thơm ngon của trà sữa kem và sự thú vị của dịch
                        vụ bài tarot!.chúng tôi không chỉ cung cấp những ly
                        trà sữa kem độc đáo và ngon lành, mà còn mang đến
                        cho bạn trải nghiệm tâm linh thông qua dịch vụ bài
                        tarot. <br></br>
                        Bạn có thể thưởng thức trà sữa kem tại không gian
                        thoải mái và ấm cúng của chúng tôi, sau đó trải
                        nghiệm một phiên bài tarot để khám phá những thông
                        điệp và lời khuyên từ vũ trụ.
                    </p>
                </div>
            </div>
        </Popup>
    );
}

AuthPopup.propTypes = {
    signUpInfor: PropTypes.object,
    handleCloseSideEffects: PropTypes.func,
};

export default AuthPopup;