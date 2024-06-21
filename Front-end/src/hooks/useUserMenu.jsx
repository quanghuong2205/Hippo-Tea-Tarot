import { useNavigate } from 'react-router-dom';
import { ITEM_IDS } from '../constants/header.const';
import { useDispatch } from 'react-redux';
import authActions from '../redux/actions/action.auth';
import useTheme from '../hooks/useTheme';

/**
 * Get handler function for each item in user menu
 */

function useUserMenu() {
    const navigate = useNavigate();
    const { setTheme, setSystemTheme } = useTheme();

    /* Dispatcher */
    const dispatch = useDispatch();

    const getHandler = ({ id }) => {
        switch (id) {
            case ITEM_IDS.SIGN_IN: {
                return () => {
                    navigate('/auth');
                };
            }

            case ITEM_IDS.SIGN_OUT: {
                return () => {
                    dispatch(authActions.signOutAction({ navigate }));
                };
            }

            case ITEM_IDS.DARK_THEME: {
                return () => {
                    setTheme({ theme: 'dark' });
                };
            }

            case ITEM_IDS.LIGHT_THEME: {
                return () => {
                    setTheme({ theme: 'light' });
                };
            }

            case ITEM_IDS.SYSTEM_THEME: {
                return () => {
                    setSystemTheme();
                };
            }

            default: {
                return null;
            }
        }
    };

    return { getHandler };
}

export default useUserMenu;
