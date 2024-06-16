import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import publicRoutes from './routes/public.route';
import { useSelector } from 'react-redux';

function AppRouter() {
    /* Auth */
    const accessToken = useSelector((state) => state.auth.accessToken);

    return (
        <Routes>
            {/* Public route */}
            <Route>
                {publicRoutes.map((publicRoute, index) => (
                    <Route
                        element={
                            publicRoute.layout ? (
                                <publicRoute.layout>
                                    <publicRoute.element />
                                </publicRoute.layout>
                            ) : (
                                <publicRoute.element />
                            )
                        }
                        path={publicRoute.path}
                        key={`${index}-${publicRoute.path}`}
                    />
                ))}
            </Route>

            {/* Private route */}

            {/* Specific route */}
            <Route
                path='/auth'
                element={!accessToken ? <Auth /> : <Navigate to={'/'} />}
            />
        </Routes>
    );
}

export default AppRouter;
