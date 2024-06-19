import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useRequireAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const auth = useSelector((state) => state.auth);

    const requireSignIn = () => {
        if (!auth.user) {
            navigate('/auth', {
                state: {
                    goBack: true,
                    redirectTo: location.pathname,
                },
            });
        }

        return !!auth.user;
    };
    return { requireSignIn };
}

export default useRequireAuth;
