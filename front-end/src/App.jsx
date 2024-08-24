import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Glasses from './pages/Glasses';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import Eyeglasses from './features/glasses/Eyeglasses';
import Sunglasses from './features/glasses/Sunglasses';
import Home from './pages/Home';
import Signin from './pages/Signin';
import ProtectedRoutes from './ProtectedRoutes';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to='home' />} />
                        <Route path='home' element={<Home />} />
                        <Route path='login' element={<Login />} />
                        <Route path='signin' element={<Signin />} />
                        {/* <Route path='forgot' element={<Forgot />} /> */}

                        <Route element={<ProtectedRoutes />}>
                            <Route path='glasses' element={<Glasses />}>
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            replace
                                            to='/glasses/eyeglasses'
                                        />
                                    }
                                />
                                <Route
                                    path='sunglasses'
                                    element={<Sunglasses />}
                                />
                                <Route
                                    path='eyeglasses'
                                    element={<Eyeglasses />}
                                />
                            </Route>
                        </Route>

                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            <GlobalStyles />
            <Toaster position='top-center' reverseOrder={true} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
