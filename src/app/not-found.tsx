// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-cyan-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 mb-6">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 transition-colors"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}
