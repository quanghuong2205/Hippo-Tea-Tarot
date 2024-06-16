import ReactDOM from 'react-dom/client';
import StoreProvider from './StoreProvider';

/* Query Client */
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StoreProvider />
        </BrowserRouter>
    </QueryClientProvider>
);
