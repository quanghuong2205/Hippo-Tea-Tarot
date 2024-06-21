'use strict';
import Image from '../../atoms/Image';
import { ITEM_IDS, MOBILE_MENU } from '../../../constants/header.const';
import SubNav from './SubNav';
import { useState } from 'react';
import NavList from './_components/NavList';
import { LuLogOut, LuLogIn } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import NavItem from './_components/NavItem';
import { dispatchEvent } from '../../../utils';
import useUserMenu from '../../../hooks/useUserMenu';
import EVENTS from '../../../constants/event.constant';

function MobileNavBar() {
    const user = useSelector((state) => state.auth.user);

    /* User hanlder */
    const { getHandler } = useUserMenu();

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

    return (
        <div className='mobile-navbar'>
            {user ? (
                <div className='user'>
                    <div className='user-avatar'>
                        <Image
                            src={'hello'}
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
                            id: ITEM_IDS.SIGN_IN,
                            icon: LuLogIn,
                            isLink: false,
                            label: 'Sign in',
                        }}
                        onClick={() => {
                            getHandler({ id: ITEM_IDS.SIGN_IN })();
                            dispatchEvent({
                                eventName: EVENTS.HIDDEN_MODAL,
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
                                id: ITEM_IDS.SIGN_OUT,
                                icon: LuLogOut,
                                isLink: false,
                                label: 'Sign out',
                            }}
                            onClick={() => {
                                getHandler({ id: ITEM_IDS.SIGN_OUT })();
                                dispatchEvent({
                                    eventName: EVENTS.HIDDEN_MODAL,
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

export default MobileNavBar;
