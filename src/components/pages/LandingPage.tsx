import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -left-40 top-60 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="max-w-xl md:ml-auto md:mr-0 md:pl-8">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Platform FMCG Terpadu
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">Selamat Datang di</h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0099cc] mb-6 bg-gradient-to-r from-[#0099cc] to-[#3366ff] bg-clip-text">
                BeliBesar
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Transformasi digital untuk rantai pasok FMCG yang lebih efisien. BeliBesar menghubungkan distributor
                  dan produsen dalam satu platform terpadu, menghilangkan fragmentasi dan menciptakan pengalaman
                  pembelian yang lebih baik.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="px-8 py-3 bg-gradient-to-r from-[#0099cc] to-[#0077aa] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  Bergabung Sekarang
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white text-[#0099cc] font-medium rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 text-center"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r rounded-full blur-3xl opacity-20 transform scale-110"></div>
                <Image
                  src="/assets/undraw_order-delivered_puaw.svg"
                  alt="BeliBesar Logo"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Stats Cards */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 transform transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-[#0099cc] mb-2">500+</p>
                  <p className="text-gray-700 font-medium">Distributor</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 transform transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  <p className="text-3xl md:text-4xl font-bold text-[#0099cc] mb-2">50+</p>
                  <p className="text-gray-700 font-medium">Produsen</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 transform transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-[#0099cc] mb-2">10K+</p>
                  <p className="text-gray-700 font-medium">Transaksi</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100 transform transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-[#0099cc] mb-2">34</p>
                  <p className="text-gray-700 font-medium">Provinsi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Alternating Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r rounded-full blur-3xl opacity-20 transform scale-110"></div>
                <Image
                  src="/assets/undraw_logistics_xpdj.svg"
                  alt="Supply Chain Optimization"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Fitur Utama
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-[#0099cc] to-[#3366ff] bg-clip-text text-transparent">
                  Optimalisasi
                </span>{" "}
                Rantai Pasok
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Platform kami dirancang untuk merampingkan dan mengoptimalkan rantai pasok untuk Fast-Moving Consumer
                  Goods (FMCG). Secara tradisional, distributor harus berkoordinasi dengan banyak sales representative
                  dari berbagai produsen, menciptakan inefisiensi dan harga yang tidak konsisten.
                </p>
              </div>
              <Link
                href="/groupbuy"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#0099cc] to-[#0077aa] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Mulai Group Buy
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second Alternating Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Keunggulan Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pembelian{" "}
                <span className="bg-gradient-to-r from-[#0099cc] to-[#3366ff] bg-clip-text text-transparent">
                  Terpusat & Efisien
                </span>
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  BeliBesar menghilangkan fragmentasi dengan mengkonsolidasikan penawaran produsen ke dalam satu sistem,
                  memungkinkan distributor untuk membeli barang melalui model pembelian kelompok yang terpusat dan lebih
                  efisien. Dapatkan harga terbaik dan proses yang lebih sederhana.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#0099cc] to-[#0077aa] text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Masuk Dashboard
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </Link>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r rounded-full blur-3xl opacity-20 transform scale-110"></div>
                <Image
                  src="/assets/undraw_delivery-truck_mjui.svg"
                  alt="Group Buying Model"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Testimoni
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata{" "}
              <span className="bg-gradient-to-r from-[#0099cc] to-[#3366ff] bg-clip-text text-transparent">
                Pengguna Kami
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Dengarkan pengalaman dari distributor dan produsen yang telah bergabung dengan platform BeliBesar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Ahmad Distributor</h3>
                  <p className="text-gray-600 text-sm">Distributor, Jakarta</p>
                </div>
              </div>
              <p className="text-gray-700">
                "BeliBesar telah mengubah cara kami beroperasi. Proses pembelian menjadi lebih efisien dan kami
                mendapatkan harga yang lebih baik melalui sistem group buy."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Sari Produsen</h3>
                  <p className="text-gray-600 text-sm">Produsen FMCG, Surabaya</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Platform ini membantu kami menjangkau lebih banyak distributor di seluruh Indonesia. Sistem yang
                terintegrasi membuat proses penjualan menjadi lebih transparan."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  B
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Budi Retailer</h3>
                  <p className="text-gray-600 text-sm">Distributor, Bandung</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Sebelumnya kami harus berkoordinasi dengan banyak sales. Sekarang dengan BeliBesar, semua pembelian
                dapat dilakukan dalam satu platform yang mudah digunakan."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0099cc] to-[#0077aa] text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/assets/undraw_business-deal_nx2n.svg"
                alt="Business Deal"
                width={250}
                height={250}
                className="w-auto h-auto max-w-xs"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabunglah dengan Ekosistem BeliBesar</h2>
            <p className="text-xl mb-8 opacity-90">
              BeliBesar hadir sebagai solusi inovatif untuk mengatasi tantangan dalam rantai pasok FMCG. Dengan
              menghubungkan produsen dan distributor dalam satu platform, kami menciptakan ekosistem yang lebih efisien,
              transparan, dan menguntungkan bagi semua pihak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-3 bg-white text-[#0099cc] font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Mulai Perjalanan Anda
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent text-white font-medium rounded-lg shadow-md hover:shadow-lg border border-white transition-all duration-300 text-center"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
