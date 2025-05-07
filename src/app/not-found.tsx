import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-[#47A3D4] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#47A3D4] text-white font-medium rounded-lg hover:bg-[#3A82A8] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
