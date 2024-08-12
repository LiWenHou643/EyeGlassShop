import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Glasses from './pages/Glasses';
import AppLayout from './ui/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import Eyeglasses from './features/glasses/Eyeglasses';
import Sunglasses from './features/glasses/Sunglasses';
import Home from './pages/Home';
import Signin from './pages/Signin';

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
                        {/* <Route path='forgot' element={<Forgot />} /> */}
                        <Route path='signin' element={<Signin />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
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
                            <Route path='eyeglasses' element={<Eyeglasses />} />
                            <Route path='sunglasses' element={<Sunglasses />} />
                        </Route>
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            <GlobalStyles />
        </QueryClientProvider>
    );
}

export default App;
