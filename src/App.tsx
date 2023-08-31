import Home from './pages/home/home';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Login from './pages/login/Login';
import './styles/global.scss';
import User from './pages/user/User';
import Product from './pages/product/Product';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Categories from './pages/Categories/Categories';

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div
        style={{
          minHeight: '100vh',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="main"
      >
        <div>
          <Navbar />
          <div className="container">
            <Menu />

            <div className="contentContainer">
              <QueryClientProvider client={queryClient}>
                <Outlet />
              </QueryClientProvider>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/categories',
          element: <Categories />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
