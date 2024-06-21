import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dispatchEvent } from '../utils';
import EVENTS from '../constants/event.constant';
import { MODAL_IDS } from '../constants/modal.constant';
import MODAL_TEXT from '../constants/modal-text.constant';

function useRequireAuth() {
    const location = useLocation();

    const auth = useSelector((state) => state.auth);

    const requireSignIn = () => {
        if (!auth.user) {
            /* Show modal link (to auth page) */
            dispatchEvent({
                eventName: EVENTS.OPEN_MODAL,
                payload: {
                    id: MODAL_IDS.LINK_MODAL,
                    data: {
                        ...MODAL_TEXT.SIGN_IN,
                        link: '/auth',
                        linkState: {
                            goBack: true,
                            redirectTo: location.pathname,
                        },
                    },
                },
            });
        }

        return !!auth.user;
    };
    return { requireSignIn };
}

export default useRequireAuth;
