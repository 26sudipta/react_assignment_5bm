import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FiLogOut, FiMail, FiUser } from 'react-icons/fi';

export default function Profile() {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-blue-100">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* User Info */}
            <div className="space-y-6 mb-8 pb-8 border-b">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl text-white font-bold">
                  {user?.email?.[0].toUpperCase()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FiUser className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-900 break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FiMail className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="text-lg font-semibold text-gray-900 break-all font-mono text-sm">
                      {user?.uid}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <p className="text-lg font-semibold text-green-600">✓ Active</p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
                  Change Password
                </button>
                <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
                  Notification Settings
                </button>
                <button className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
                  Billing Information
                </button>
              </div>
            </div>

            {/* Logout Section */}
            <div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
              >
                <FiLogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Logout Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Out?</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to sign out of your account?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
