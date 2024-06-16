import { CiMenuFries } from 'react-icons/ci';
import { dispatchEvent } from '../../../utils';
import EVENTS from '../../../constants/event.constant';
import { MODAL_TITLES } from '../../../constants/modal.constant';
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
                                eventName: EVENTS.OPEN_MODAL,
                                payload: {
                                    title: MODAL_TITLES.HEADER_MOBILE_MODAL,
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
