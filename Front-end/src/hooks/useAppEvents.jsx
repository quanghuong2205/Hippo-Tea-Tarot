import { useEffect } from 'react';
import { getParentNode } from '../utils/dom.utils';
import { dispatchEvent } from '../utils';
import EVENTS from '../constants/event.constant';

function useAppEvents() {
    const handleHiddenTooltip = (e) => {
        const parentNode = getParentNode({
            parentClassName: 'tooltip',
            parentId: 'tooltip',
            node: e.target,
        });

        if (!parentNode) {
            dispatchEvent({
                eventName: EVENTS.TOOLTIP_HIDDEN,
            });
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleHiddenTooltip);

        return () => {
            window.removeEventListener('click', handleHiddenTooltip);
        };
    });
}

export default useAppEvents;
