"use client"
import GroupBuyProfile from "@/components/fragments/GroupBuyProfile"
import { handleLogout } from "@/components/layout/LogoutButton"
import { Notification } from "@/db/models/NotificationModel"
import type { UserType } from "@/types/types"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const ProfilePage = ({ user }: { user: UserType }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/notifications?userId=${user._id}`, {
        headers: {
          "x-user-data": JSON.stringify({ _id: user._id }),
        },
      })
      const data = await response.json()
      if (data.success) {
        setNotifications(data.data)
        // Calculate unread count
        const unreadNotifications = data.data.filter((notification: Notification) => !notification.isRead)
        setUnreadCount(unreadNotifications.length)
      } else {
        console.error("Failed to fetch notifications:", data)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  const deleteNotification = async (notificationId: string) => {
    try {
      console.log("Deleting notification with ID:", notificationId)
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-data": JSON.stringify({ _id: user._id }),
        },
        body: JSON.stringify({ notificationId }),
      })
      const data = await response.json()
      console.log("Response from server:", data)

      if (data.success) {
        setNotifications((prev) => prev.filter((notification) => notificationId !== notificationId))
      } else {
        toast.error("Failed to delete notification:", data)
      }
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/notifications/markAllAsRead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-data": JSON.stringify({ _id: user._id }),
        },
        body: JSON.stringify({ userId: user._id }),
      })
      const data = await response.json()

      if (data.success) {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
        setUnreadCount(0)
      } else {
        toast.error("Failed to mark notifications as read:", data)
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error)
    }
  }

  useEffect(() => {
    if (showNotificationModal) {
      fetchNotifications()
    }
  }, [showNotificationModal])

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 flex items-center">
          <span>Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] h-28 relative">
              {/* Notification Icon */}
              <div
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-all"
                onClick={() => setShowNotificationModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1e3a5f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            <div className="px-6 pt-14 pb-6 relative">
              {/* Profile Avatar */}
              <div className="absolute -top-12 left-6 w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-[#1e3a5f]">
                {user.name.charAt(0)}
              </div>

              <div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-[#1e3a5f]">Halo, {user.name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="inline-block px-3 py-1 bg-[#edf2f7] text-[#1e3a5f] rounded-full text-sm font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    <span>{user.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distributor Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="absolute right-4 top-4 flex flex-col space-y-3 z-10">
              {/* Edit Profile Icon */}
              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1e3a5f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>

              {/* Logout Icon */}
              <div
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all shadow-md"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#ef4444]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0099cc] to-[#0077aa] h-28 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-[#0099cc] mb-6">{user.companyName}</h2>

              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="text-lg font-medium text-gray-800">{user.contact.address.regency}</span>
                </div>
                <span className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                  {user.contact.address.province}
                </span>
              </div>
            </div>
          </div>

          {user.role !== "admin" && (
            <>
              {/* Bank Account Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-2">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#1e3a5f] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <h2 className="text-xl font-bold text-[#1e3a5f]">Bank Account</h2>
                  </div>

                  <div className="bg-gradient-to-r from-[#1a202c] to-[#2d3748] rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-20 -mr-20"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -mb-10 -ml-10"></div>

                    <div className="flex justify-between items-center mb-8 relative z-10">
                      <div className="text-sm opacity-80 uppercase tracking-wider font-medium">Bank Account</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>

                    <div className="text-2xl font-bold tracking-widest mb-6 relative z-10">
                      {user?.bankAccount?.number
                        ? user.bankAccount.number.replace(/(\d{4})/g, "$1 ").trim()
                        : "•••• •••• •••• 0123"}
                    </div>

                    <div className="flex justify-between items-center relative z-10">
                      <div>
                        <div className="text-xs opacity-80 uppercase tracking-wider font-medium mb-1">
                          ACCOUNT HOLDER
                        </div>
                        <div className="font-medium">{user?.bankAccount?.name || "BRO"}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-xl font-bold">{user?.bankAccount?.name?.charAt(0) || "B"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Group Buy Participation Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-2">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#1e3a5f] mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h2 className="text-xl font-bold text-[#1e3a5f]">Group Buy Participation</h2>
                  </div>

                  <div className="space-y-4">
                    <GroupBuyProfile user={user} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Notification Modal */}
      {showNotificationModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowNotificationModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1e3a5f] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                  />
                </svg>
                Notifications
              </h2>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 mb-6">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 flex justify-between items-center ${
                    notification.isRead ? "bg-gray-100 border-gray-300" : "bg-blue-50 border-[#0099cc]"
                  }`}
                >
                  <div>
                    <p className="font-medium text-[#1e3a5f]">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#15294a] transition-colors font-medium"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  )
}

export default ProfilePage
