import ReactDOM from 'react-dom/client';
import StoreProvider from './StoreProvider';

/* Query Client */
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <StoreProvider />
    </QueryClientProvider>
);
