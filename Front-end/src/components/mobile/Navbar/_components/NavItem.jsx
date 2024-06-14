import PropTypes from 'prop-types';
import Button from '../../../atoms/Button';
import { dispatchEvent } from '../../../../utils';
import EVENTS from '../../../../constants/event.constant';

function NavItem({ item, onClick }) {
    return (
        <li className='mobile-navbar__item'>
            {item.isLink ? (
                <Button
                    linkTo={item.path}
                    onClick={() => {
                        /* Close the navbar when navigate to link */
                        dispatchEvent({
                            eventName: EVENTS.HIDDEN_PANEL,
                        });
                    }}>
                    <>
                        {item?.icon && <item.icon />}
                        <span>{item.label}</span>
                    </>
                </Button>
            ) : (
                <div onClick={onClick}>
                    {item?.icon && <item.icon />}
                    <span>{item.label}</span>
                </div>
            )}
        </li>
    );
}

NavItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

export default NavItem;
