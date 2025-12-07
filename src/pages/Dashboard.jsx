import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiShoppingBag, FiUser, FiSettings } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data - in a real app, fetch from Firebase/database
  const stats = [
    { label: 'Total Orders', value: '5', icon: FiShoppingBag },
    { label: 'Total Spent', value: '$249.99', icon: FiShoppingBag },
    { label: 'Active Account', value: 'Yes', icon: FiUser },
  ];

  const recentOrders = [
    {
      id: 1,
      date: '2024-12-05',
      total: '$89.99',
      status: 'Delivered',
      items: 3,
    },
    {
      id: 2,
      date: '2024-12-01',
      total: '$45.50',
      status: 'Processing',
      items: 2,
    },
    {
      id: 3,
      date: '2024-11-28',
      total: '$114.50',
      status: 'Delivered',
      items: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-blue-100">Here's your shopping dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className="text-blue-600 text-4xl opacity-20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Continue Shopping →
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-gray-600">{order.items} items</td>
                      <td className="px-6 py-4 font-semibold text-blue-600">
                        {order.total}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No orders yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 transition font-semibold flex items-center gap-3"
          >
            <FiShoppingBag size={24} />
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg p-6 transition font-semibold flex items-center gap-3"
          >
            <FiSettings size={24} />
            Manage Account
          </Link>
        </div>
      </div>
    </div>
  );
}
