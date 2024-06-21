import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import { dispatchEvent } from '../../utils';
import EVENTS from '../../constants/event.constant';

function LinkModal({ data }) {
    const handleHiddenModal = () => {
        dispatchEvent({
            eventName: EVENTS.HIDDEN_MODAL,
        });
    };
    console.log(data);
    return (
        <div className='link-modal'>
            <header className='modal-header'>
                <h3 className='modal-header__heading'>{data.title}</h3>

                <p className='modal-header__desc'>{data.desc}</p>
            </header>

            <footer className='modal-footer'>
                <button
                    className='outline-btn modal-btn'
                    onClick={handleHiddenModal}>
                    Cancel
                </button>
                <Button
                    onClick={handleHiddenModal}
                    linkTo={data.link}
                    urlState={data.linkState}
                    className={'pri-btn modal-btn'}>
                    <>{data.linkTitle}</>
                </Button>
            </footer>
        </div>
    );
}

LinkModal.propTypes = {
    data: PropTypes.shape({
        link: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
        linkTitle: PropTypes.string,
        linkState: PropTypes.object,
    }),
    handleHiddenModal: PropTypes.func,
    id: PropTypes.string,
};

export default LinkModal;
