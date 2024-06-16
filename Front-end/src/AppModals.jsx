import { MODALS } from './constants/modal.constant';
import Modal from './components/common/Modal';
import useModal from './hooks/useModal';

function AppModals() {
    /* Panel */
    const { hiddenModal, openedModal, isVisible, setIsVisisble } =
        useModal({
            modalItems: MODALS,
        });

    return (
        <>
            {openedModal?.isOpen && (
                <Modal
                    hiddenModal={hiddenModal}
                    position={openedModal.position}
                    outOfDom={openedModal.outOfDOM}
                    isVertical={openedModal.isVertical}
                    animationTime={400}
                    isVisible={isVisible}
                    setIsVisisble={setIsVisisble}>
                    <openedModal.component data={openedModal?.data} />
                </Modal>
            )}
        </>
    );
}

export default AppModals;
