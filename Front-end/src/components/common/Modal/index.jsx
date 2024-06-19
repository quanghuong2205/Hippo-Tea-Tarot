import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import Overlay from '../Overlay';
import { useEffect, useState } from 'react';
import EVENTS from '../../../constants/event.constant';
import Button from '../../atoms/Button';
import { IoMdClose } from 'react-icons/io';

function Modal({
    children,
    handleHiddenModal,
    position,
    isVertical,
    hasCloseBtn,
    hasOverlay,
    id,
    layer,
}) {
    const animationTime = 500;

    const [animatedBeforeHidden, setAnimatedBeforeHidden] =
        useState(false);

    const hiddenModalHandler = () => {
        setAnimatedBeforeHidden(true);

        setTimeout(() => {
            handleHiddenModal({
                modalID: id,
            })();
        }, animationTime);
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
                    hidden: animatedBeforeHidden,
                })}
                style={{
                    zIndex: 999 + layer + 1,
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
                            onClick={hiddenModalHandler}>
                            <IoMdClose />
                        </Button>
                    )}
                </div>
            </div>

            {hasOverlay && (
                <Overlay
                    onClick={hiddenModalHandler}
                    animationTime={animationTime}
                    zIndex={999 + layer}
                    isShown={!animatedBeforeHidden}
                />
            )}
        </>
    );
}

Modal.propTypes = {
    children: PropTypes.element,
    position: PropTypes.string,
    id: PropTypes.string,
    handleHiddenModal: PropTypes.func,
    hasCloseBtn: PropTypes.bool,
    isVertical: PropTypes.bool,
    hasOverlay: PropTypes.bool,
    layer: PropTypes.number,
};

export default Modal;
