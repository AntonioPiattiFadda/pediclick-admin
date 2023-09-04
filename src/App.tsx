// import Home from './pages/home/home';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Products from './pages/products/Products';
// import Navbar from './components/navbar/Navbar';
// import Footer from './components/footer/Footer';
// import Menu from './components/menu/Menu';
// import Login from './pages/login/Login';
// import './styles/global.scss';
// import Product from './pages/product/Product';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Settings from './pages/Settings/Settings';
// import Categories from './pages/Categories/Categories';

// const queryClient = new QueryClient();

// function App() {
//   const Layout = () => {
//     return (
//       <div
//         style={{
//           minHeight: '100vh',
//           height: 'auto',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//         className="main"
//       >
//         <div>
//           <Navbar />
//           <div className="container">
//             <Menu />

//             <div className="contentContainer">
//               <QueryClientProvider client={queryClient}>
//                 <Outlet />
//               </QueryClientProvider>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Layout />,
//       children: [
//         {
//           path: '/',
//           element: <Home />,
//         },
//         {
//           path: '/dashboard',
//           element: <Dashboard />,
//         },

//         {
//           path: '/products',
//           element: <Products />,
//         },
//         {
//           path: '/categories',
//           element: <Categories />,
//         },

//         {
//           path: '/products/:id',
//           element: <Product />,
//         },
//         {
//           path: '/settings',
//           element: <Settings />,
//         },
//       ],
//     },
//     {
//       path: '/settings',
//       element: <Settings />,
//     },
//     {
//       path: '/login',
//       element: <Login />,
//     },
//     {
//       path: '/products/:id',
//       element: <Product />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

import Home from './pages/home/home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import './styles/global.scss';
import Categories from './pages/Categories/Categories';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/products/Products';
import Settings from './pages/Settings/Settings';
import Menu from './components/menu/Menu';

const App = () => {
  return (
    <BrowserRouter>
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<h1>Pagina no econtrada</h1>} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
