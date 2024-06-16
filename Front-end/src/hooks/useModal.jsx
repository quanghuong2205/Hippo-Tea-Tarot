import { useEffect, useMemo, useRef, useState } from 'react';
import EVENTS from '../constants/event.constant';

/**
 * modalItems: {
 *      modalItem: component
 * }
 */

function useModal({ modalItems }) {
    const bodyNode = useRef(document.querySelector('body'));
    const [modals, setModals] = useState(() => {
        const modalKeys = Object.keys(modalItems);

        /* Initial panels with open state (false) */
        modalKeys.forEach((modalKey) => {
            modalItems[modalKey] = {
                ...modalItems[modalKey],
                isOpen: false,
                data: null,
            };
        });

        return modalItems;
    });
    const [isVisible, setIsVisisble] = useState(true);

    /**
     * @desc Open the targeted panel
     */
    const openModal = ({ modalTitle, modalData }) => {
        const isOpen = modals[modalTitle].isOpen;

        /* The current panel is not removed out of DOM
            it is just invisible
        */
        if (!isOpen) {
            setModals((prev) => {
                prev[modalTitle] = {
                    ...prev[modalTitle],
                    isOpen: true,
                    data: modalData,
                };
                return { ...prev };
            });
        }
        setIsVisisble(true);

        bodyNode.current.classList.add('scroll');
    };

    /**
     * @desc Hidden Open the panel
     */
    const hiddenModal = () => {
        setModals((prev) => {
            const modalKeys = Object.keys(prev);

            /* Hidden current opened panel */
            modalKeys.forEach((key) => (prev[key].isOpen = false));

            return { ...prev };
        });

        // bodyNode.current.style.setProperty('padding-left', '0px');
        // bodyNode.current.style.setProperty('padding-right', '0px');
        bodyNode.current.classList.remove('scroll');
    };

    const openedModal = useMemo(() => {
        const modalKeys = Object.keys(modals);
        const openedModalKey = modalKeys.find((key) => modals[key].isOpen);

        return openedModalKey ? modals[openedModalKey] : undefined;
    }, [modals]);

    useEffect(() => {
        const openModalHandler = (e) => {
            const title = e.detail?.title;
            if (!title) return;

            openModal({
                modalTitle: title,
                modalData: e.detail?.data,
            });
        };

        window.addEventListener(EVENTS.OPEN_MODAL, openModalHandler);

        return () => {
            window.removeEventListener(
                EVENTS.OPEN_MODAL,
                openModalHandler
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        hiddenModal,
        openedModal,
        isVisible,
        setIsVisisble: (bool) => {
            bodyNode.current.classList.toggle('scroll');
            setIsVisisble(bool);
        },
    };
}

export default useModal;
