import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DarkModeProvider } from './context/DarkModeContext';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ForgotPwd from './pages/ForgotPwd';
import Unauthorized from './pages/Unauthorized';
import PageNotFound from './pages/PageNotFound';
import ProductsGridView from './features/product/ProductsGridView';
import ProductDetails from './features/product/ProductDetails';
import PersistLogin from './features/authentication/PersistLogin';
import RequireAuth from './features/authentication/RequireAuth';
import { AuthProvider } from './context/AuthContext';
const queryClient = new QueryClient();
const ROLES = {
    user: 'USER',
    admin: 'ADMIN',
};

function App() {
    return (
        <AuthProvider>
            <DarkModeProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<AppLayout />}>
                                {/* pubilc routes */}
                                <Route
                                    index
                                    element={<Navigate replace to='home' />}
                                />

                                <Route path='login' element={<Login />} />
                                <Route path='signin' element={<Register />} />
                                <Route
                                    path='unauthorized'
                                    element={<Unauthorized />}
                                />
                                <Route
                                    path='forgot-password'
                                    element={<ForgotPwd />}
                                />
                                <Route path='products' element={<Product />}>
                                    <Route
                                        index
                                        element={<ProductsGridView />}
                                    />
                                    <Route
                                        path=':id'
                                        element={<ProductDetails />}
                                    />
                                </Route>

                                <Route path='home' element={<Home />} />

                                {/* -- PROTECTED ROUTES -- */}
                                <Route element={<PersistLogin />}>
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.user]}
                                            />
                                        }
                                    >
                                        <Route
                                            path='user/profile'
                                            element={<Profile />}
                                        />
                                    </Route>
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.user]}
                                            />
                                        }
                                    >
                                        <Route
                                            path='user/cart'
                                            element={<Cart />}
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
            </DarkModeProvider>
        </AuthProvider>
    );
}

export default App;
