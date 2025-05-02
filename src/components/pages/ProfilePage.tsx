import React from 'react';
import { handleLogout } from '@/components/layout/LogoutButton';

const ProfilePage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex-grow min-h-screen">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info */}
          <div>
            <h2 className="text-xl mb-2">
              Halo, <span className="font-bold text-[#1e3a5f]">Madurani</span>
            </h2>
            <p className="text-gray-600">madurajaya@gmail.com</p>
            <p className="text-gray-600">0857634898002</p>
          </div>

          {/* Distributor Info */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Distributor</h2>
            <p className="text-lg font-bold mb-2">Toko Madura 1</p>
            <p className="text-lg mb-1">Surabaya</p>
            <p className="text-lg">Jawa Timur</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-3">
            <button className="w-full max-w-[200px] btn btn-primary">Ubah Profil</button>
            <button
              className="w-full max-w-[200px] btn btn-error"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
