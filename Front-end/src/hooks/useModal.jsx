import { useEffect, useRef, useState } from 'react';
import EVENTS from '../constants/event.constant';
import { MODALS } from '../constants/modal.constant';
const MODAL_IDS = Object.keys(MODALS);

/**
 * modalItems: {
 *      modalItem: component
 * }
 */

function useModal() {
    const bodyNode = useRef(document.querySelector('body'));
    const [openedModals, setOpenedModals] = useState([
        // {
        //     ...MODALS['af7a133a-350f-49c1-b158-db6076bd8e3d'],
        //     id: 'af7a133a-350f-49c1-b158-db6076bd8e3d',
        //     data: {
        //         user: { name: 'huong' },
        //     },
        // },
    ]);

    /**
     * @desc Open the targeted panel
     */
    const handleOpenModal = ({ modalID, modalData }) => {
        setOpenedModals((prev) => {
            if (prev.find((m) => m.id === modalID)) return [...prev];

            prev.push({
                ...MODALS[modalID],
                id: modalID,
                data: modalData,
            });

            return [...prev];
        });

        bodyNode.current.classList.add('hidden-scrollbar');
    };

    /**
     * @desc Hidden Open the panel
     */
    const handleHiddenModal = ({ modalID }) => {
        return () => {
            console.log(modalID);
            setOpenedModals((prev) => {
                prev = prev.filter((m) => m.id !== modalID);
                return [...prev];
            });

            bodyNode.current.classList.remove('hidden-scrollbar');
        };
    };

    useEffect(() => {
        const openModalHandler = (e) => {
            const id = e.detail?.id;
            if (!id) return;

            if (!MODAL_IDS.includes(id)) {
                throw new Error(`Modal ID:: ${id} is not valid`);
            }

            handleOpenModal({
                modalID: id,
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
        handleHiddenModal,
        openedModals,
    };
}

export default useModal;
