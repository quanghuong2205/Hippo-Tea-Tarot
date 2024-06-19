import { SIDEBAR_ITEMS } from './constant';
import { dispatchEvent } from '../../utils';
import EVENTS from '../../constants/event.constant';

function SideBar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-menu'>
                {SIDEBAR_ITEMS.map((item) => (
                    <div
                        key={`sidebar-item/${item.title}`}
                        className='sidebar-item'
                        onClick={() => {
                            dispatchEvent({
                                eventName: EVENTS.OPEN_MODAL,
                                payload: {
                                    id: item.modelID,
                                },
                            });
                        }}>
                        <item.icon
                            className='sidebar-icon'
                            isBold
                        />
                        <span className='sidebar-text'>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
