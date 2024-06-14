import { CiMenuFries } from 'react-icons/ci';
import { dispatchEvent } from '../../../utils';
import EVENTS from '../../../constants/event.constant';
import { PANEL_TITLES } from '../../../constants/panel.constant';
import SearchIcon from '../../../components/icons/SearchIcon';
import HeartIcon from '../../../components/icons/HeartIcon';
import Button from '../../../components/atoms/Button';

function HeaderOnMobile() {
    return (
        <>
            <div className='header-left'>
                <button
                    className='header-icon'
                    onClick={() => {
                        {
                            dispatchEvent({
                                eventName: EVENTS.OPEN_PANEL,
                                payload: {
                                    title: PANEL_TITLES.HEADER_MOBILE_PANEL,
                                },
                            });
                        }
                    }}>
                    <CiMenuFries />
                </button>
            </div>

            <div className='header-right'>
                <Button
                    className={'header-icon'}
                    linkTo={'/search'}>
                    <SearchIcon
                        width={20}
                        height={20}
                    />
                </Button>

                <Button
                    className={'header-icon'}
                    linkTo={'/notify'}>
                    <HeartIcon
                        width={20}
                        height={20}
                    />
                </Button>
            </div>
        </>
    );
}

export default HeaderOnMobile;
