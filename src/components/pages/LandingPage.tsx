import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di</h1>
            <h2 className="text-4xl font-bold text-primary mb-4">BeliBesar</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                Transformasi digital untuk rantai pasok FMCG yang lebih efisien. BeliBesar menghubungkan distributor dan produsen dalam satu platform terpadu, menghilangkan fragmentasi dan menciptakan pengalaman pembelian yang lebih baik.
              </p>
            </div>
            <Link
              href="/products"
              className="btn btn-primary"
            >
              Lihat Produk
            </Link>
          </div>
          <div className="rounded-lg aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            <Image
              src="/assets/undraw_order-delivered_puaw.svg"
              alt="BeliBesar Logo"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* First Alternating Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg aspect-square w-full max-w-md mx-auto md:order-1 order-2 flex items-center justify-center">
            <Image
              src="/assets/undraw_logistics_xpdj.svg"
              alt="Supply Chain Optimization"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div className="md:order-2 order-1">
            <h2 className="text-3xl font-bold text-primary mb-4">Optimalisasi Rantai Pasok</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                Platform kami dirancang untuk merampingkan dan mengoptimalkan rantai pasok untuk Fast-Moving Consumer Goods (FMCG). Secara tradisional, distributor harus berkoordinasi dengan banyak sales representative dari berbagai
                produsen, menciptakan inefisiensi dan harga yang tidak konsisten.
              </p>
            </div>
            <Link
              href="/groupbuy"
              className="btn btn-primary"
            >
              Mulai Group Buy
            </Link>
          </div>
        </div>
      </section>

      {/* Second Alternating Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Pembelian Terpusat & Efisien</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                BeliBesar menghilangkan fragmentasi dengan mengkonsolidasikan penawaran produsen ke dalam satu sistem, memungkinkan distributor untuk membeli barang melalui model pembelian kelompok yang terpusat dan lebih efisien. Dapatkan
                harga terbaik dan proses yang lebih sederhana.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="btn btn-primary"
            >
              Masuk Dashboard
            </Link>
          </div>
          <div className="rounded-lg aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            <Image
              src="/assets/undraw_delivery-truck_mjui.svg"
              alt="Group Buying Model"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Additional Text Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-2">
            <div className="flex justify-center mb-6">
              <Image
                src="/assets/undraw_business-deal_nx2n.svg"
                alt="Business Deal"
                width={300}
                height={300}
                className="w-full h-auto max-w-md"
              />
            </div>
            <p>
              BeliBesar hadir sebagai solusi inovatif untuk mengatasi tantangan dalam rantai pasok FMCG. Dengan menghubungkan produsen dan distributor dalam satu platform, kami menciptakan ekosistem yang lebih efisien, transparan, dan
              menguntungkan bagi semua pihak. Bergabunglah dengan kami dan rasakan transformasi digital dalam bisnis FMCG Anda.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
