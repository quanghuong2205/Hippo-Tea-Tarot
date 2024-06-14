import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import Overlay from '../Overlay';
import { useEffect } from 'react';
import EVENTS from '../../../constants/event.constant';

function Panel({
    children,
    handleHiddenPanel,
    direction = 'fromLeft',
    animationTime = 500,
    outOfDom,
    isVisible,
    setIsVisisble,
}) {
    const hiddenPanelHandler = () => {
        setIsVisisble(false);
        setTimeout(
            () => (outOfDom ? handleHiddenPanel() : null),
            animationTime
        );
    };

    useEffect(() => {
        window.addEventListener(EVENTS.HIDDEN_PANEL, hiddenPanelHandler);

        return () => {
            window.removeEventListener(
                EVENTS.HIDDEN_PANEL,
                hiddenPanelHandler
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={clsx({
                panel: true,
                'panel--fromLeft': direction === 'fromLeft',
                'panel--fromRight': direction === 'fromRight',
                hidden: !isVisible,
            })}
            style={{
                pointerEvents: isVisible ? 'auto' : 'none',
            }}>
            <Overlay
                onClick={hiddenPanelHandler}
                isShown={isVisible}
                animationTime={animationTime}
            />
            <div
                className='panel__content'
                style={{
                    animationDuration: `${animationTime}ms`,
                    transitionDuration: `${animationTime}ms`,
                }}>
                {children}
            </div>
        </div>
    );
}

Panel.propTypes = {
    children: PropTypes.element,
    direction: PropTypes.string,
    handleHiddenPanel: PropTypes.func,
    animationTime: PropTypes.number,
    outOfDom: PropTypes.bool,
    isVisible: PropTypes.bool,
    setIsVisisble: PropTypes.func,
};

export default Panel;
