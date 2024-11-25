import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Dashboard from './features/admin/Dashboard';
import Orders from './features/admin/Orders';
import PersistLogin from './features/authentication/PersistLogin';
import RequireAuth from './features/authentication/RequireAuth';
import ProductDetails from './features/product/ProductDetails';
import ProductsGridView from './features/product/ProductsGridView';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ForgotPwd from './pages/ForgotPwd';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderDetails from './pages/OrderDetails';
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
    guest: 'GUEST',
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
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={['GUEST']}
                                            />
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <Navigate replace to='home' />
                                            }
                                        />
                                        <Route path='home' element={<Home />} />
                                        <Route
                                            path='*'
                                            element={<PageNotFound />}
                                        />
                                        <Route
                                            path='login'
                                            element={<Login />}
                                        />
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
                                    </Route>

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
                                            <Route
                                                path='user/cart'
                                                element={<Cart />}
                                            />
                                            <Route
                                                path='orders/:id'
                                                element={<Order />}
                                            />
                                            <Route
                                                path='checkout'
                                                element={<Checkout />}
                                            />
                                            <Route
                                                path='order-details/:id'
                                                element={<OrderDetails />}
                                            />
                                        </Route>
                                    </Route>
                                </Route>

                                <Route element={<PersistLogin />}>
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.admin]}
                                            />
                                        }
                                    >
                                        <Route path='admin' element={<Admin />}>
                                            <Route
                                                index
                                                element={
                                                    <Navigate
                                                        replace
                                                        to='dashboard'
                                                    />
                                                }
                                            />
                                            <Route
                                                path='dashboard'
                                                element={<Dashboard />}
                                            />
                                            <Route
                                                path='orders'
                                                element={<Orders />}
                                            />
                                        </Route>
                                    </Route>
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
