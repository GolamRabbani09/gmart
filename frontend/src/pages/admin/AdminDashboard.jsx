import { useState, useEffect } from 'react';
import { orderAPI, userAPI, productAPI } from '../../services/api';
import { FiDollarSign, FiUsers, FiShoppingBag, FiBox } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userStats, orderStats, products] = await Promise.all([
          userAPI.getStats(),
          orderAPI.getStats(),
          productAPI.getAll({ limit: 1 }), // Just to get total count
        ]);

        setStats({
          users: userStats.data.total,
          orders: orderStats.data.stats?.reduce((acc, curr) => acc + curr.count, 0) || 0,
          revenue: orderStats.data.totalRevenue || 0,
          products: products.data.total || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `৳${stats.revenue.toLocaleString()}`, icon: <FiDollarSign />, color: 'bg-green-500' },
    { title: 'Total Orders', value: stats.orders, icon: <FiShoppingBag />, color: 'bg-blue-500' },
    { title: 'Total Products', value: stats.products, icon: <FiBox />, color: 'bg-purple-500' },
    { title: 'Total Users', value: stats.users, icon: <FiUsers />, color: 'bg-orange-500' },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shrink-0 ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Welcome to G-Mart Admin</h2>
        <p className="text-gray-600">
          From the sidebar, you can manage products, view and update orders, and manage users. 
          Currently, the database might be empty unless you have run the seeder script.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
