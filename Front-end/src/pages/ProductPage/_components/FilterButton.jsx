import { CiFilter } from 'react-icons/ci';
import EVENTS from '../../../constants/event.constant';
import { MODAL_IDS } from '../../../constants/modal.constant';
import { dispatchEvent } from '../../../utils';

function FilterButton() {
    return (
        <button
            className='pri-btn'
            style={{
                height: 38,
                fontWeight: 400,
            }}
            onClick={() => {
                dispatchEvent({
                    eventName: EVENTS.OPEN_MODAL,
                    payload: {
                        id: MODAL_IDS.FILTER_MODAL,
                    },
                });
            }}>
            <CiFilter />
            Filter
        </button>
    );
}

export default FilterButton;
