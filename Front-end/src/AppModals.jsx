import Modal from './components/common/Modal';
import useModal from './hooks/useModal';

function AppModals() {
    /* Panel */
    const { handleHiddenModal, openedModals } = useModal();

    if (openedModals.length === 0) return <></>;

    if (openedModals.length === 1) {
        const openedModal = openedModals[0];
        return (
            <Modal
                handleHiddenModal={handleHiddenModal}
                position={openedModal.position}
                isVertical={openedModal.isVertical}
                hasCloseBtn={openedModal?.hasCloseButton}
                id={openedModal.id}
                layer={openedModal.layer}
                hasOverlay={openedModal.hasOverlay}>
                <openedModal.component data={openedModal?.data} />
            </Modal>
        );
    }
}

export default AppModals;
