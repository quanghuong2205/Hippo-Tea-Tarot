import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../../atoms/Button';
import { clsx } from 'clsx';
import Overlay from '../Overlay';

function Popup({
    children,
    closeOnOverlay,
    hasCloseBtn,
    handleCloseSideEffects,
    animationTime = 400,
}) {
    const [popupIsShown, setPopupIsShown] = useState(true);

    const handleClosePopup = () => {
        /* Hanlde side effects after hiding popup */
        if (popupIsShown) {
            setTimeout(
                () => handleCloseSideEffects && handleCloseSideEffects(),
                animationTime
            );
        }

        /* Show or hidden popup */
        setPopupIsShown(false);
    };

    return (
        <>
            <div className='popup'>
                <div
                    className={clsx({
                        'popup-inner': true,
                        shown: popupIsShown,
                    })}
                    style={{
                        animationDuration: `${animationTime}ms`,
                        transitionDuration: `${animationTime}ms`,
                    }}>
                    {children}

                    {hasCloseBtn && (
                        <Button
                            className={'popup__close'}
                            onClick={handleClosePopup}>
                            <IoMdClose />
                        </Button>
                    )}
                </div>
            </div>

            <Overlay
                zIndex={998}
                isShown={popupIsShown}
                onClick={closeOnOverlay ? handleClosePopup : null}
            />
        </>
    );
}

Popup.propTypes = {
    children: PropTypes.element,
    closeOnOverlay: PropTypes.bool,
    hasCloseBtn: PropTypes.bool,
    handleCloseSideEffects: PropTypes.func,
    animationTime: PropTypes.number,
};

export default Popup;
