import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import Overlay from '../Overlay';
import { useEffect } from 'react';
import EVENTS from '../../../constants/event.constant';
import Button from '../../atoms/Button';
import { IoMdClose } from 'react-icons/io';

function Modal({
    children,
    hiddenModal,
    position = '',
    outOfDom,
    isVertical,
    animationTime = 500,
    isVisible,
    setIsVisisble,
    hasCloseBtn,
}) {
    const hiddenModalHandler = () => {
        setIsVisisble(false);
        setTimeout(() => (outOfDom ? hiddenModal() : null), animationTime);
    };

    useEffect(() => {
        window.addEventListener(EVENTS.HIDDEN_MODAL, hiddenModalHandler);

        return () => {
            window.removeEventListener(
                EVENTS.HIDDEN_MODAL,
                hiddenModalHandler
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className={clsx({
                    modal: true,
                    'modal-vertical': isVertical,
                    'modal-vertical--leftEdge': position === 'leftEdge',
                    'modal-vertical--rightEdge': position === 'rightEdge',
                    hidden: !isVisible,
                })}
                style={{
                    pointerEvents: isVisible ? 'auto' : 'none',
                }}>
                <div
                    className='inner'
                    style={{
                        animationDuration: `${animationTime}ms`,
                        transitionDuration: `${animationTime}ms`,
                    }}>
                    {children}
                    {hasCloseBtn && (
                        <Button
                            className={'modal__close'}
                            onClick={hiddenModal}>
                            <IoMdClose />
                        </Button>
                    )}
                </div>
            </div>

            <Overlay
                onClick={hiddenModalHandler}
                isShown={isVisible}
                animationTime={animationTime}
                zIndex={998}
            />
        </>
    );
}

Modal.propTypes = {
    children: PropTypes.element,
    position: PropTypes.string,
    hiddenModal: PropTypes.func,
    animationTime: PropTypes.number,
    outOfDom: PropTypes.bool,
    isVisible: PropTypes.bool,
    setIsVisisble: PropTypes.func,
    hasCloseBtn: PropTypes.bool,
    isVertical: PropTypes.bool,
};

export default Modal;
