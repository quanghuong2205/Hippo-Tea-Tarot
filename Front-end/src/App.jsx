import { Suspense, useEffect } from 'react';
import AppRouter from './AppRouter';
import useAppEvents from './hooks/useAppEvents';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import getHtmlTitle from './routes/title.route';
import AppModals from './AppModals';
import MediaLoading from './components/loaders/MediaLoading';
import useTheme from './hooks/useTheme';

function App() {
    /* Routes */
    const location = useLocation();

    /* Events */
    useAppEvents();

    /* Themes */
    const { setThemeBasedOnUserPreference } = useTheme();

    useEffect(() => {
        setThemeBasedOnUserPreference();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('app re-render');
    return (
        <>
            <Helmet
                defaultTitle='TeaShop'
                titleTemplate='TeaShop - %s'>
                <title>{getHtmlTitle({ path: location.pathname })}</title>
            </Helmet>

            <Suspense fallback={<MediaLoading />}>
                <AppRouter />
                <AppModals />
            </Suspense>
        </>
    );
}

export default App;
