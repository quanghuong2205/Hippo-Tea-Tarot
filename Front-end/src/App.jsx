import { Suspense } from 'react';
import AppRouter from './AppRouter';
import useAppEvents from './hooks/useAppEvents';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import getHtmlTitle from './routes/title.route';
import AppModals from './AppModals';
import Loading from './components/common/Loading';

function App() {
    /* Routes */
    const location = useLocation();

    /* Events */
    useAppEvents();

    return (
        <>
            <Helmet
                defaultTitle='TeaShop'
                titleTemplate='TeaShop - %s'>
                <title>{getHtmlTitle({ path: location.pathname })}</title>
            </Helmet>
            <Suspense fallback={<Loading />}>
                <AppRouter />
                <AppModals />
            </Suspense>
        </>
    );
}

export default App;
