export default function LandingPage() {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang di</h1>
            <h2 className="text-4xl font-bold text-primary mb-4">BeliBesar</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="bg-base-200 rounded-lg aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
              />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      </section>

      {/* First Alternating Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-base-200 rounded-lg aspect-square w-full max-w-md mx-auto md:order-1 order-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
              />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="md:order-2 order-1">
            <h2 className="text-3xl font-bold text-primary mb-4">Some title in here</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Second Alternating Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Some title in here</h2>
            <div className="space-y-2 mb-6">
              <p className="text-base-content opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="bg-base-200 rounded-lg aspect-square w-full max-w-md mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
              />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>
      </section>

      {/* Additional Text Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-2">
            <p className="text-base-content opacity-70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
