import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

// Simple placeholder for pages not yet implemented
const Placeholder = ({ title }) => (
  <div className="min-h-[60vh] flex items-center justify-center container-custom">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-500">This page is under construction.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Placeholders for remaining routes */}
            <Route path="/checkout" element={<Placeholder title="Checkout" />} />
            <Route path="/orders" element={<Placeholder title="My Orders" />} />
            <Route path="/profile" element={<Placeholder title="My Profile" />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<Placeholder title="Manage Products" />} />
              <Route path="orders" element={<Placeholder title="Manage Orders" />} />
              <Route path="users" element={<Placeholder title="Manage Users" />} />
            </Route>

            <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
