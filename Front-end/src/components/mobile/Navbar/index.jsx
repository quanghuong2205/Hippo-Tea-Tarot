'use strict';
import Image from '../../atoms/Image';
import { MOBILE_MENU } from '../../../constants/header.const';
import SubNav from './SubNav';
import { useState } from 'react';
import NavList from './_components/NavList';
import { LuLogOut, LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../../../redux/actions/action.auth';
import NavItem from './_components/NavItem';
import { dispatchEvent } from '../../../utils';
import EVENTS from '../../../constants/event.constant';

function MobileNavBar() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    /* Sub nav controller */
    const [sub, setSub] = useState([]);
    const openSub = ({ sub, title, icon }) => {
        return () => {
            setSub((prev) => {
                prev.push({
                    sub,
                    title,
                    icon,
                });
                return [...prev];
            });
        };
    };

    const closeSub = () => {
        setSub((prev) => {
            prev.splice(prev.length - 1, 1);
            return [...prev];
        });
    };

    /* Dispatcher */
    const dispatcher = useDispatcher();

    return (
        <div className='mobile-navbar'>
            {user ? (
                <div className='user'>
                    <div className='user-avatar'>
                        <Image
                            src={
                                'https://th.bing.com/th/id/OIP.6gJD-jUf5ApBDegR5sIleQHaNL?w=186&h=331&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                            }
                            options={{
                                fit: true,
                                round: true,
                            }}
                        />
                    </div>

                    <span className='user-name'>
                        {user.name || 'User'}
                    </span>
                </div>
            ) : (
                <ul className='mobile-navbar__list'>
                    <NavItem
                        item={{
                            id: 'LI',
                            icon: LuLogIn,
                            isLink: false,
                            label: 'Sign in',
                        }}
                        onClick={() => {
                            navigate('/auth');
                            dispatchEvent({
                                eventName: EVENTS.HIDDEN_PANEL,
                            });
                        }}
                    />
                </ul>
            )}

            <div className='mobile-navbar__body'>
                {MOBILE_MENU.map((list, index) => (
                    <NavList
                        key={`mobile-navbar-menu-${index}`}
                        list={list}
                        openSub={openSub}
                    />
                ))}

                {user && (
                    <ul className='mobile-navbar__list'>
                        <NavItem
                            item={{
                                id: 'LO',
                                icon: LuLogOut,
                                isLink: false,
                                label: 'Sign out',
                            }}
                            onClick={() => {
                                dispatcher.signOutDispatcher();
                                dispatchEvent({
                                    eventName: EVENTS.HIDDEN_PANEL,
                                });
                            }}
                        />
                    </ul>
                )}
            </div>

            {sub.length !== 0 && (
                <SubNav
                    openSub={openSub}
                    closeSub={closeSub}
                    sub={sub}
                    subIndex={0}
                />
            )}
        </div>
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

export default MobileNavBar;
