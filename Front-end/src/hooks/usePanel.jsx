import { useEffect, useMemo, useRef, useState } from 'react';
import EVENTS from '../constants/event.constant';

/**
 * PanelItems: {
 *      panelName: component
 * }
 */

function usePanel({ panelItems }) {
    const bodyNode = useRef(document.querySelector('body'));
    const [panels, setPanels] = useState(() => {
        const panelKeys = Object.keys(panelItems);

        /* Initial panels with open state (false) */
        panelKeys.forEach((panelKey) => {
            panelItems[panelKey] = {
                ...panelItems[panelKey],
                isOpen: false,
            };
        });

        return panelItems;
    });
    const [isVisible, setIsVisisble] = useState(true);

    /**
     * @desc Open the targeted panel
     */
    const handleOpenPanel = (panelName) => {
        const isOpen = panels[panelName].isOpen;

        /* The current panel is not removed out of DOM
            it is just invisible
        */
        if (!isOpen) {
            setPanels((prev) => {
                prev[panelName].isOpen = true;
                return { ...prev };
            });
        }
        setIsVisisble(true);

        bodyNode.current.classList.add('scroll');
    };

    /**
     * @desc Hidden Open the panel
     */
    const handleHiddenPanel = () => {
        setPanels((prev) => {
            const panelKeys = Object.keys(prev);

            /* Hidden current opened panel */
            panelKeys.forEach((key) => (prev[key].isOpen = false));

            return { ...prev };
        });

        // bodyNode.current.style.setProperty('padding-left', '0px');
        // bodyNode.current.style.setProperty('padding-right', '0px');
        bodyNode.current.classList.remove('scroll');
    };

    const openedPanel = useMemo(() => {
        const panelKeys = Object.keys(panels);
        const openedPanelKey = panelKeys.find((key) => panels[key].isOpen);

        // if (openedPanelKey) {
        //     bodyNode.current.style.setProperty(
        //         `padding-${
        //             panels[openedPanelKey].direction == 'fromLeft'
        //                 ? 'right'
        //                 : 'left'
        //         }`,
        //         'var(--scrollbar-thumb-width)'
        //     );
        // }

        return openedPanelKey ? panels[openedPanelKey] : undefined;
    }, [panels]);

    useEffect(() => {
        const openPanelHandler = (e) => {
            const title = e.detail?.title;
            if (!title) return;

            handleOpenPanel(title);
        };

        window.addEventListener(EVENTS.OPEN_PANEL, openPanelHandler);

        return () => {
            window.removeEventListener(
                EVENTS.OPEN_PANEL,
                openPanelHandler
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        handleHiddenPanel,
        OpenedPanelComponent: openedPanel?.component,
        direction: openedPanel?.direction,
        outOfDom: openedPanel?.outOfDOM,
        isVisible,
        setIsVisisble: (bool) => {
            bodyNode.current.classList.toggle('scroll');
            setIsVisisble(bool);
        },
    };
}

export default usePanel;
