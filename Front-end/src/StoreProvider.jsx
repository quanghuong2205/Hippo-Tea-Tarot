import { Provider } from 'react-redux';
import { initStore } from './redux/store';
import { useEffect, useState } from 'react';
import App from './App';

function StoreProvider() {
    const [store, setStore] = useState(null);
    const [isLoadingStore, setIsLoadingStore] = useState(true);

    /* Initialize the Redux store, including data fetching
        and authentication
       Prepare store before rendering the app
     */
    useEffect(() => {
        const initAuth = async () => {
            const initedStore = await initStore();
            setStore(initedStore);
            setIsLoadingStore(false);
        };

        initAuth();
    }, []);

    if (isLoadingStore) {
        return <span>...is loading store</span>;
    }

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default StoreProvider;
