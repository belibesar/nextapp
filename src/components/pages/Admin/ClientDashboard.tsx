"use client"

import { useState } from "react"
import type { ProducerType, UserType } from "@/types/types"
import {
  Package,
  Building2,
  Users,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Bell,
  Search,
  Calendar,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  X,
  PieChart,
  LineChart,
  BarChart,
  FileText,
  Download,
  Printer,
  Share2,
  User,
  ShoppingBag,
  CreditCard,
} from "lucide-react"

export default function ClientDashboard({
    user,
    productsData,
    producersData,
    distributorsData,
    currentDate,
  }: {
    user: UserType
    productsData: any[]
    producersData: ProducerType[]
    distributorsData: UserType[]
    currentDate: string
  }) {
    // State for modals
    const [reportsModalOpen, setReportsModalOpen] = useState(false)
    const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
    const [selectedProducer, setSelectedProducer] = useState<ProducerType | null>(null)
    const [selectedDistributor, setSelectedDistributor] = useState<UserType | null>(null)
  
    return (
      <div className="min-h-screen bg-[#f8fafc] font-sans">
  
        <section className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex items-center text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{currentDate}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <button
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                onClick={() => setReportsModalOpen(true)}
              >
                <TrendingUp className="h-4 w-4" /> Reports
              </button>
              <button
                className="px-4 py-2 bg-[#1194D0] rounded-lg text-sm font-medium text-white hover:bg-[#0d7ab0] flex items-center gap-2 shadow-sm"
                onClick={() => setAnalyticsModalOpen(true)}
              >
                <BarChart3 className="h-4 w-4" /> Analytics
              </button>
            </div>
          </div>
  
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{productsData.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#1194D0] transition-colors duration-300">
                  <Package className="h-6 w-6 text-[#1194D0] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12% increase this month</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">27</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <CheckCircle className="h-6 w-6 text-green-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>8% increase this week</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                  <AlertCircle className="h-6 w-6 text-yellow-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-red-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                <span>3% decrease this week</span>
              </div>
            </div>
  
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">On Delivery</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">72</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <Truck className="h-6 w-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-500 text-xs font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>24% increase this month</span>
              </div>
            </div>
          </div>
  
          {/* Admin Info Card */}
          <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-48 bg-gradient-to-r from-[#1194D0] to-[#0d7ab0] p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
  
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-light text-white">
                      Welcome back, <span className="font-bold capitalize">{user.name}</span>
                    </h2>
                    <div className="flex items-center text-blue-100">
                      <Mail className="h-4 w-4 mr-1" />
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <h2 className="text-xl font-bold capitalize text-white">{user.role}</h2>
                  </div>
                </div>
  
                <div>
                  <h2 className="text-3xl font-bold text-white">BeliBesar</h2>
                  <div className="flex items-center mt-1 text-blue-100">
                    <Building2 className="h-4 w-4 mr-1" />
                    <h3 className="text-xl">Head Office</h3>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-[#1194D0]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Distributors</p>
                    <p className="text-lg font-bold">{distributorsData.length}</p>
                  </div>
                </div>
  
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <Building2 className="h-5 w-5 text-[#1194D0]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Producers</p>
                    <p className="text-lg font-bold">{producersData.length}</p>
                  </div>
                </div>
  
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-[#1194D0]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="text-lg font-bold">Today, 09:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Producers Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-[#1194D0]/10 flex items-center justify-center mr-3">
                  <Building2 className="h-5 w-5 text-[#1194D0]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Producers</h2>
              </div>
              <button className="text-[#1194D0] text-sm font-medium flex items-center hover:underline">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {producersData.map((producer: ProducerType, index: number) => (
                <div
                  key={`producer-${index}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="h-2 bg-gradient-to-r from-[#1194D0] to-[#0d7ab0]"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold capitalize text-gray-800 text-lg">{producer.name}</h3>
                      <span className="font-medium bg-[#1194D0]/10 text-[#1194D0] px-3 py-1 rounded-full text-xs">
                        {producer?.products?.length} Products
                      </span>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p className="lowercase">{producer.contact.email}</p>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p>{producer.contact.phone}</p>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p className="capitalize">{producer.contact.address}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        className="w-full text-center text-[#1194D0] text-sm font-medium py-2 rounded-lg hover:bg-[#1194D0]/5 transition-colors duration-300"
                        onClick={() => setSelectedProducer(producer)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Distributors Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-[#1194D0]/10 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-[#1194D0]" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Distributors</h2>
              </div>
              <button className="text-[#1194D0] text-sm font-medium flex items-center hover:underline">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {distributorsData.map((distributor: UserType, index: number) => (
                <div
                  key={`distributor-${index}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="h-2 bg-gradient-to-r from-[#1194D0] to-[#0d7ab0]"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{distributor.name}</h3>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mt-1">
                          Distributor
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1194D0] font-bold">
                        {distributor.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p className="lowercase">{distributor.email}</p>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p>{distributor.contact.phone}</p>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 group-hover:text-[#1194D0] transition-colors duration-300" />
                        <p className="capitalize">{distributor.contact.address.province}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        className="w-full text-center text-[#1194D0] text-sm font-medium py-2 rounded-lg hover:bg-[#1194D0]/5 transition-colors duration-300"
                        onClick={() => setSelectedDistributor(distributor)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
  
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12 py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">© 2025 BeliBesar. All rights reserved.</div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <a href="#" className="hover:text-[#1194D0]">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-[#1194D0]">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-[#1194D0]">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
  
        {/* Reports Modal */}
        {reportsModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#1194D0]" />
                  <h2 className="text-xl font-bold text-gray-800">Reports</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setReportsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Monthly Sales Report</h3>
                    <p className="text-sm text-gray-500">May 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Printer className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
                    <p className="text-2xl font-bold text-gray-800">$128,430</p>
                    <div className="flex items-center text-green-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>18% vs last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Orders Completed</h4>
                    <p className="text-2xl font-bold text-gray-800">1,842</p>
                    <div className="flex items-center text-green-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>12% vs last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Average Order Value</h4>
                    <p className="text-2xl font-bold text-gray-800">$69.72</p>
                    <div className="flex items-center text-green-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>5% vs last month</span>
                    </div>
                  </div>
                </div>
  
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Monthly Sales Trend</h4>
                  <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 text-[#1194D0] mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Sales trend chart would appear here</p>
                    </div>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Top Products</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div key={item} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-[#1194D0]/10 rounded-md flex items-center justify-center">
                                <Package className="h-4 w-4 text-[#1194D0]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">Product {item}</p>
                                <p className="text-xs text-gray-500">SKU-{1000 + item}</p>
                              </div>
                            </div>
                            <p className="font-medium text-gray-800">${(Math.random() * 1000).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Top Distributors</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div key={item} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-[#1194D0]/10 rounded-md flex items-center justify-center">
                                <User className="h-4 w-4 text-[#1194D0]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">Distributor {item}</p>
                                <p className="text-xs text-gray-500">ID-{2000 + item}</p>
                              </div>
                            </div>
                            <p className="font-medium text-gray-800">${(Math.random() * 10000).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
                  onClick={() => setReportsModalOpen(false)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#1194D0] rounded-lg text-sm font-medium text-white hover:bg-[#0d7ab0]">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Analytics Modal */}
        {analyticsModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-[#1194D0]" />
                  <h2 className="text-xl font-bold text-gray-800">Analytics Dashboard</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setAnalyticsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
                    <p className="text-2xl font-bold text-gray-800">24.8%</p>
                    <div className="flex items-center text-green-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>3.2% vs last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Avg. Session Duration</h4>
                    <p className="text-2xl font-bold text-gray-800">4m 32s</p>
                    <div className="flex items-center text-green-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>12% vs last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500">Bounce Rate</h4>
                    <p className="text-2xl font-bold text-gray-800">32.4%</p>
                    <div className="flex items-center text-red-500 text-xs mt-1">
                      <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                      <span>2.1% vs last month</span>
                    </div>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Traffic Sources</h4>
                    <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-10 w-10 text-[#1194D0] mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Traffic sources chart would appear here</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">Sales by Category</h4>
                    <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-10 w-10 text-[#1194D0] mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Sales by category chart would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">User Activity Timeline</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-4">
                      {[
                        { time: "09:45 AM", action: "New order placed", icon: ShoppingBag, amount: "$245.99" },
                        { time: "10:23 AM", action: "Payment received", icon: CreditCard, amount: "$1,200.50" },
                        { time: "11:15 AM", action: "New distributor registered", icon: User, amount: "" },
                        { time: "01:30 PM", action: "Bulk order processed", icon: Package, amount: "$5,680.75" },
                        { time: "03:45 PM", action: "Inventory updated", icon: Package, amount: "+128 items" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="h-8 w-8 bg-[#1194D0]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <item.icon className="h-4 w-4 text-[#1194D0]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">{item.action}</p>
                              <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                            {item.amount && <p className="text-sm text-gray-600 mt-0.5">{item.amount}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
                  onClick={() => setAnalyticsModalOpen(false)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#1194D0] rounded-lg text-sm font-medium text-white hover:bg-[#0d7ab0]">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Producer Details Modal */}
        {selectedProducer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#1194D0]" />
                  <h2 className="text-xl font-bold text-gray-800">Producer Details</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedProducer(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 capitalize">{selectedProducer.name}</h3>
                    <div className="inline-flex items-center bg-[#1194D0]/10 text-[#1194D0] px-3 py-1 rounded-full text-xs font-medium mt-2">
                      <Package className="h-3 w-3 mr-1" />
                      {selectedProducer?.products?.length} Products
                    </div>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-[#1194D0]/10 flex items-center justify-center text-[#1194D0] font-bold text-xl">
                    {selectedProducer.name.charAt(0).toUpperCase()}
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-800 lowercase">{selectedProducer.contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-800">{selectedProducer.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-medium text-gray-800 capitalize">
                            {selectedProducer.contact.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-500">Order Fulfillment</p>
                          <p className="text-xs font-medium text-gray-800">98%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "98%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-500">On-time Delivery</p>
                          <p className="text-xs font-medium text-gray-800">92%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1194D0] rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-500">Quality Rating</p>
                          <p className="text-xs font-medium text-gray-800">4.8/5</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "96%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Products</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {(selectedProducer.products || Array(5).fill(null)).map((product, index) => (
                        <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-[#1194D0]/10 rounded-md flex items-center justify-center">
                              <Package className="h-5 w-5 text-[#1194D0]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {product?.name || `Product ${index + 1}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product?.category || `Category ${(index % 3) + 1}`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">
                              ${product?.price || ((index + 1) * 10 + 9.99).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">Stock: {product?.stock || (index + 1) * 25}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
                  onClick={() => setSelectedProducer(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#1194D0] rounded-lg text-sm font-medium text-white hover:bg-[#0d7ab0]">
                  Contact Producer
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Distributor Details Modal */}
        {selectedDistributor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-[#1194D0]" />
                  <h2 className="text-xl font-bold text-gray-800">Distributor Details</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedDistributor(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedDistributor.name}</h3>
                    <div className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium mt-2">
                      Distributor
                    </div>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-[#1194D0]/10 flex items-center justify-center text-[#1194D0] font-bold text-xl">
                    {selectedDistributor.name.charAt(0).toUpperCase()}
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-800 lowercase">{selectedDistributor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-800">{selectedDistributor.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Province</p>
                          <p className="text-sm font-medium text-gray-800 capitalize">
                            {selectedDistributor.contact.address.province}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Account Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Account Type</p>
                          <p className="text-sm font-medium text-gray-800">Premium</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Member Since</p>
                          <p className="text-sm font-medium text-gray-800">January 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <ShoppingBag className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Total Orders</p>
                          <p className="text-sm font-medium text-gray-800">128</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Recent Orders</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-[#1194D0]/10 rounded-md flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-[#1194D0]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">Order #{10000 + index}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(2025, 4, 20 - index).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-800">
                                ${(Math.random() * 1000 + 500).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {["Delivered", "Processing", "Shipped", "Delivered", "Pending"][index]}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200"
                  onClick={() => setSelectedDistributor(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#1194D0] rounded-lg text-sm font-medium text-white hover:bg-[#0d7ab0]">
                  Contact Distributor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  