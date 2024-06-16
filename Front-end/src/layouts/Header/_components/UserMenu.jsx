import PropTypes from 'prop-types';
import Button from '../../../components/atoms/Button';
import { USER_MENU } from '../../../constants/header.const';
import { useDispatch } from 'react-redux';
import authActions from '../../../redux/actions/action.auth';
import { useNavigate } from 'react-router-dom';
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
                    {subMenu.map((item, i) => (
                        <>
                            <li key={`sub-menu/${i}`}>
                                {item.isLink ? (
                                    <Button linkTo={item.path}>
                                        <>{item.label}</>
                                    </Button>
                                ) : (
                                    <span onClick={null}>
                                        {item.label}
                                    </span>
                                )}
                            </li>

                            {/* Sign out button */}
                            {menuIndex == USER_MENU.length - 1 &&
                                i == subMenu.length - 1 && (
                                    <li key={`sub-menu/LO`}>
                                        <span
                                            onClick={
                                                dispatcher.signOutDispatcher
                                            }>
                                            {'Sign out'}
                                        </span>
                                    </li>
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
