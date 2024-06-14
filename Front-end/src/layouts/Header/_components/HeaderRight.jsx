import { useSelector } from 'react-redux';
import Image from '../../../components/atoms/Image';
import config from '../../../../configs';
import UserMenu from './UserMenu';
import LoginButton from './LoginButton';
import Navigate from './Navigate';
import Dropdown from '../../../components/common/DropDown';

function HeaderRight() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className='header-right'>
            <Navigate />
            {user ? (
                <div className='header-avatar'>
                    <Dropdown
                        Trigger={() => (
                            <Image
                                options={{
                                    fit: true,
                                    round: true,
                                }}
                                src={`${config.SERVER_URL}/${user.avatar}`}
                            />
                        )}
                        Content={() => <UserMenu />}
                    />
                </div>
            ) : (
                <LoginButton />
            )}
        </div>
    );
}

export default HeaderRight;
