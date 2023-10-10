import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import RootLayout from './layout/RootLayout/RootLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <RootLayout>
            <main>
              <Outlet />
            </main>
          </RootLayout>
        </div>
        <Toaster />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App;
