import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import BackIcon from '../../icons/BackIcon';
import { useState } from 'react';
import clsx from 'clsx';
import NavList from './_components/NavList';

function SubNav({ openSub, closeSub, hiddenSub, sub, subIndex }) {
    const [hasSub, setHasSub] = useState(false);
    const [isShown, setIsShown] = useState(true);
    const animationTime = 400;

    const handleBackSub = () => {
        setIsShown(false);

        setTimeout(() => {
            hiddenSub && hiddenSub();
            closeSub();
        }, animationTime);
    };

    const handlePushSub = ({ sub, title, icon }) => {
        return () => {
            if (sub && sub.length !== 0) {
                openSub({ sub, title, icon })();
                setHasSub(true);
            }
        };
    };

    const subObject = sub[subIndex];

    return (
        <div
            className={clsx({
                'mobile-subnav': true,
                hidden: !isShown,
            })}
            style={{
                animationDuration: `${animationTime}ms`,
            }}>
            <div className='mobile-subnav__header'>
                <Button
                    className='mobile-subnav__back-btn'
                    onClick={handleBackSub}>
                    <BackIcon />
                </Button>

                <span className='mobile-subnav__title'>
                    {subObject.title}
                </span>

                {subObject?.icon && (
                    <div className='mobile-subnav__icon'>
                        <subObject.icon />
                    </div>
                )}
            </div>

            <div className='mobile-subnav__body'>
                {subObject.sub.map((list, index) => (
                    <NavList
                        key={`mobile-subnav-list/${index}`}
                        openSub={handlePushSub}
                        list={list}
                    />
                ))}
            </div>

            {hasSub && (
                <SubNav
                    openSub={openSub}
                    closeSub={closeSub}
                    sub={sub}
                    subIndex={subIndex + 1}
                    hiddenSub={() => setHasSub(false)}
                />
            )}
        </div>
    );
}

SubNav.propTypes = {
    closeSub: PropTypes.func,
    hiddenSub: PropTypes.func,
    openSub: PropTypes.func,
    sub: PropTypes.array,
    subIndex: PropTypes.number,
};

export default SubNav;
