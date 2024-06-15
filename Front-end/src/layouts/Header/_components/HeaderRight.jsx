import { useSelector } from 'react-redux';
import Image from '../../../components/atoms/Image';
import config from '../../../../configs';
import UserMenu from './UserMenu';
import LoginButton from './LoginButton';
import Navigate from './Navigate';
import Tooltip from '../../../components/common/Tooltip';

function HeaderRight() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className='header-right'>
            <Navigate />
            {user ? (
                <div className='header-avatar'>
                    <Tooltip
                        clickOnShown
                        hasDefaultStyle
                        position='bottom-right'
                        clickOnShow
                        spaces={{
                            right: null,
                        }}
                        TriggerComponent={() => (
                            <Image
                                options={{
                                    fit: true,
                                    round: true,
                                }}
                                src={`${config.SERVER_URL}/${user.avatar}`}
                            />
                        )}
                        DisplayComponent={() => <UserMenu />}
                    />
                </div>
            ) : (
                <LoginButton />
            )}
        </div>
    );
}

export default HeaderRight;
