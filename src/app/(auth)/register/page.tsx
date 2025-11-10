// app/register/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Semua field wajib diisi.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message + ' Anda akan diarahkan ke halaman login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.message || 'Gagal mendaftar. Silakan coba lagi.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan pada koneksi.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-cyan-500 to-cyan-900">
      <Card className="w-full max-w-md p-3 bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold text-cyan-800">
            Buat Akun Baru
          </CardTitle>
          <p className="text-sm text-gray-500">
            Silakan isi form di bawah untuk mendaftar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
                {success}
              </p>
            )}

            <Button
              type="submit"
              className="w-full p-4 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold transition-all duration-200"
            >
              Daftar
            </Button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link
                href="/login"
                className="text-cyan-700 font-medium hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
