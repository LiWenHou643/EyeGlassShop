import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DarkModeProvider } from './context/DarkModeContext';
import PersistLogin from './features/authentication/PersistLogin';
import RequireAuth from './features/authentication/RequireAuth';
import ProductDetails from './features/product/ProductDetails';
import ProductsGridView from './features/product/ProductsGridView';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ForgotPwd from './pages/ForgotPwd';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import ScrollToTop from './ui/ScrollToTop';
const queryClient = new QueryClient();
const ROLES = {
    user: 'USER',
    admin: 'ADMIN',
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <DarkModeProvider>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <ScrollToTop />
                            <Routes>
                                <Route element={<AppLayout />}>
                                    {/* pubilc routes */}
                                    <Route
                                        index
                                        element={<Navigate replace to='home' />}
                                    />
                                    <Route path='home' element={<Home />} />

                                    <Route path='login' element={<Login />} />
                                    <Route
                                        path='signin'
                                        element={<Register />}
                                    />
                                    <Route
                                        path='unauthorized'
                                        element={<Unauthorized />}
                                    />
                                    <Route
                                        path='forgot-password'
                                        element={<ForgotPwd />}
                                    />
                                    <Route
                                        path='products'
                                        element={<Product />}
                                    >
                                        <Route
                                            index
                                            element={<ProductsGridView />}
                                        />
                                        <Route
                                            path=':id'
                                            element={<ProductDetails />}
                                        />
                                    </Route>

                                    <Route
                                        path='checkout'
                                        element={<Checkout />}
                                    />

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

                                    <Route
                                        path='*'
                                        element={<PageNotFound />}
                                    />
                                </Route>
                            </Routes>
                        </BrowserRouter>

                        <GlobalStyles />
                        <Toaster position='top-center' reverseOrder={true} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </DarkModeProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
