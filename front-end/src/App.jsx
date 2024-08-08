import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Glasses from './pages/Glasses';
import AppLayout from './ui/AppLayout';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/glasses' element={<Glasses />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
