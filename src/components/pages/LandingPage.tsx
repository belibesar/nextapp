import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShoppingCart, Search, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top info bar */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div>Welcome to worldwide MegaMart!</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-blue-500">
              <MapPin
                size={16}
                className="text-blue-500"
              />
              <span>Deliver to 423651</span>
            </div>
            <div className="flex items-center gap-1 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4l-4 4z"></path>
              </svg>
              <span>Track your order</span>
            </div>
            <div className="flex items-center gap-1 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
              </svg>
              <span>All Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header with logo, search and cart */}
      <header className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                ></line>
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                ></line>
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                ></line>
              </svg>
            </button>
            <Link
              href="/"
              className="text-2xl font-bold text-blue-500"
            >
              MegaMart
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md pl-10"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm"
            >
              Sign Up/Sign In
            </Link>
            <Link
              href="/cart"
              className="flex items-center"
            >
              <ShoppingCart />
              <span className="ml-1">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Category navigation */}
      <nav className="container mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <Link
            href="/groceries"
            className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center whitespace-nowrap"
          >
            Groceries{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/premium-fruits"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Premium Fruits{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/home-kitchen"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Home & Kitchen{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/fashion"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Fashion{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/electronics"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Electronics{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/beauty"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Beauty{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/home-improvement"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Home Improvement{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
          <Link
            href="/sports-toys"
            className="px-4 py-2 bg-white border border-gray-200 rounded-full flex items-center whitespace-nowrap"
          >
            Sports, Toy & Luggage{' '}
            <ChevronDown
              size={16}
              className="ml-1"
            />
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-4">
        {/* Hero Banner */}
        <div className="relative bg-[#1e2a47] rounded-lg overflow-hidden mb-8">
          <div className="flex items-center p-8">
            <div className="text-white max-w-md">
              <p className="text-sm mb-2">Best Deal Online on smart watches</p>
              <h1 className="text-4xl font-bold mb-2">SMART WEARABLE.</h1>
              <p className="text-xl font-semibold">UP to 80% OFF</p>
            </div>
            <div className="ml-auto">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Smart Watch"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* Carousel controls */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
            <ChevronRight size={24} />
          </button>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-1 pb-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-white' : 'w-1.5 bg-gray-400'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Smartphones Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Grab the best deal on <span className="text-blue-500 border-b-2 border-blue-500 pb-0.5">Smartphones</span>
            </h2>
            <Link
              href="/smartphones"
              className="text-blue-500 flex items-center text-sm"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                name: 'Galaxy S22 Ultra',
                price: '₹23999',
                oldPrice: '₹36999',
                save: '₹13000',
                img: '/placeholder.svg?height=200&width=150',
              },
              {
                name: 'Galaxy M13 (4GB | 64 GB)',
                price: '₹10499',
                oldPrice: '₹14999',
                save: '₹4500',
                img: '/placeholder.svg?height=200&width=150',
              },
              {
                name: 'Galaxy M33 (4GB | 64 GB)',
                price: '₹16999',
                oldPrice: '₹24999',
                save: '₹8000',
                img: '/placeholder.svg?height=200&width=150',
              },
              {
                name: 'Galaxy M32 (4GB | 64 GB)',
                price: '₹13999',
                oldPrice: '₹20999',
                save: '₹7000',
                img: '/placeholder.svg?height=200&width=150',
              },
              {
                name: 'Galaxy S22 Ultra',
                price: '₹74799',
                oldPrice: '₹85999',
                save: '₹11000',
                img: '/placeholder.svg?height=200&width=150',
              },
            ].map((phone, index) => (
              <div
                key={index}
                className={`bg-white p-4 rounded-lg border ${index === 1 ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-lg">34% OFF</div>
                  <div className="flex justify-center">
                    <Image
                      src={phone.img || '/placeholder.svg'}
                      alt={phone.name}
                      width={150}
                      height={200}
                      className="object-contain h-40"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium">{phone.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold">{phone.price}</span>
                    <span className="text-gray-500 line-through text-sm">{phone.oldPrice}</span>
                  </div>
                  <p className="text-green-500 text-sm mt-1">Save - {phone.save}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop by Categories */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Shop From <span className="text-blue-500 border-b-2 border-blue-500 pb-0.5">Top Categories</span>
            </h2>
            <Link
              href="/categories"
              className="text-blue-500 flex items-center text-sm"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {[
              { name: 'Mobile', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Cosmetics', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Electronics', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Furniture', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Watches', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Decor', img: '/placeholder.svg?height=80&width=80' },
              { name: 'Accessories', img: '/placeholder.svg?height=80&width=80' },
            ].map((category, index) => (
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                  <Image
                    src={category.img || '/placeholder.svg'}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="object-contain p-2"
                  />
                </div>
                <span className="mt-2 text-sm text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Electronics Brands */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              <span className="text-blue-500 border-b-2 border-blue-500 pb-0.5">Top Electronics</span> Brands
            </h2>
            <Link
              href="/electronics-brands"
              className="text-blue-500 flex items-center text-sm"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1e1e1e] rounded-lg p-4 flex items-center">
              <div className="text-white">
                <div className="uppercase text-sm mb-2">iPhone</div>
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <p className="text-sm font-bold">UP to 80% OFF</p>
              </div>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=150&width=100"
                  alt="iPhone"
                  width={100}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="bg-[#fde68a] rounded-lg p-4 flex items-center">
              <div>
                <div className="uppercase text-sm mb-2">realme</div>
                <Image
                  src="/placeholder.svg?height=30&width=80"
                  alt="Realme logo"
                  width={80}
                  height={30}
                  className="object-contain mb-2"
                />
                <p className="text-sm font-bold">UP to 80% OFF</p>
              </div>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=150&width=100"
                  alt="Realme phone"
                  width={100}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="bg-[#ffedd5] rounded-lg p-4 flex items-center">
              <div>
                <div className="uppercase text-sm mb-2">xiaomi</div>
                <div className="bg-[#ff6700] rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <span className="text-white font-bold">MI</span>
                </div>
                <p className="text-sm font-bold">UP to 80% OFF</p>
              </div>
              <div className="ml-auto">
                <Image
                  src="/placeholder.svg?height=150&width=100"
                  alt="Xiaomi phone"
                  width={100}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-blue-500' : 'w-1.5 bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </section>

        {/* Daily Essentials */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Daily <span className="text-blue-500 border-b-2 border-blue-500 pb-0.5">Essentials</span>
            </h2>
            <Link
              href="/daily-essentials"
              className="text-blue-500 flex items-center text-sm"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Daily Essentials', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
              { name: 'Vegetables', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
              { name: 'Fruits', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
              { name: 'Strawberry', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
              { name: 'Mango', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
              { name: 'Cherry', discount: 'UP to 50% OFF', img: '/placeholder.svg?height=120&width=120' },
            ].map((item, index) => (
              <div
                key={index}
                className={`border ${index === 0 ? 'border-blue-500' : 'border-gray-200'} rounded-lg bg-white p-2`}
              >
                <div className="flex justify-center">
                  <Image
                    src={item.img || '/placeholder.svg'}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-contain h-24"
                  />
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-sm">{item.name}</h3>
                  <p className="text-xs font-medium">{item.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">MegaMart</h2>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Contact Us</h3>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <div>WhatsApp</div>
                    <div>+1 209-918-2132</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <div>Call Us</div>
                    <div>+1 209-918-2132</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Download App</h3>
                <div className="flex gap-2">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Most Popular Categories</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Staples</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Beverages</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Personal Care</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Home Care</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Baby Care</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Vegetables & Fruits</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Snacks & Foods</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Dairy & Bakery</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Customer Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>About Us</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Terms & Conditions</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>FAQ</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Privacy Policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>E-waste Policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  <span>Cancellation & Return Policy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-400 mt-8 pt-4 text-center text-sm">© 2023 All rights reserved. Reliance Retail Ltd.</div>
        </div>
      </footer>
    </div>
  );
}
