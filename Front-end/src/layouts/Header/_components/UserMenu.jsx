import PropTypes from 'prop-types';
import Button from '../../../components/atoms/Button';
import { USER_MENU } from '../../../constants/header.const';
import { useDispatch } from 'react-redux';
import authActions from '../../../redux/actions/action.auth';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import clsx from 'clsx';

function UserMenu() {
    const dispatcher = useDispatcher();

    return (
        <div className='header__user-menu'>
            {USER_MENU.map((subMenu, menuIndex) => (
                <ul
                    className={clsx({
                        hasBorder: menuIndex !== USER_MENU.length - 1,
                    })}
                    key={`sub-menu/${menuIndex}`}>
                    {subMenu.map((item, itemIndex) => (
                        <>
                            <MenuItem
                                key={`sub-menu/${item.id}`}
                                uniqueKey={`sub-menu/${item.id}`}
                                item={item}
                            />

                            {/* Sign out button */}
                            {menuIndex == USER_MENU.length - 1 &&
                                itemIndex == subMenu.length - 1 && (
                                    <MenuItem
                                        onClick={
                                            dispatcher.signOutDispatcher
                                        }
                                        key={`sub-menu/LO`}
                                        uniqueKey={`sub-menu/${item.id}`}
                                        item={{
                                            id: 'LO',
                                            icon: LuLogOut,
                                            isLink: false,
                                            label: 'Sign out',
                                        }}
                                    />
                                )}
                        </>
                    ))}
                </ul>
            ))}
        </div>
    );
}

function MenuItem({ item, uniqueKey, onClick }) {
    const isLink = item.isLink;
    return (
        <li key={uniqueKey}>
            {isLink ? (
                <Button linkTo={item.path}>
                    <>{item.label}</>
                </Button>
            ) : (
                <span onClick={onClick}>{item.label}</span>
            )}
        </li>
    );
}

/**
 * Dispatcher
 */
function useDispatcher() {
    const navigate = useNavigate();
    /* Dispatcher */
    const dispatch = useDispatch();

    return {
        signOutDispatcher: () =>
            dispatch(authActions.signOutAction({ navigate })),
    };
}

MenuItem.propTypes = {
    item: PropTypes.object,
    uniqueKey: PropTypes.string,
    onClick: PropTypes.func,
};

export default UserMenu;
