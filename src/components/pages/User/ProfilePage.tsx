import React from 'react';
import { handleLogout } from '@/components/layout/LogoutButton';
import { UserType } from '@/types/types';

const ProfilePage = ({ user }: { user: UserType }) => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex-grow min-h-screen">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info */}
          <div>
            <h2 className="text-xl mb-2">
              Halo, <span className="font-bold text-[#1e3a5f]">{user.name}</span>
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.contact.phone}</p>
          </div>

          {/* Distributor Info */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">{user.role}</h2>
            <p className="text-lg font-bold mb-2">{user.companyName}</p>
            <p className="text-lg mb-1">{user.contact.address.regency}</p>
            <p className="text-lg">{user.contact.address.province}</p>
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

          {/* Bank Account Info */}
          <div className="text-left">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Bank Account</h2>
            <p className="text-lg font-bold mb-2">{user?.bankAccount?.name}</p>
            <p className="text-lg mb-1">{user?.bankAccount?.number}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
