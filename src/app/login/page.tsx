import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-700 p-6">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-extrabold text-cyan-800 ">
            Selamat Datang
          </CardTitle>
          <p className="text-sm text-gray-500">Silakan masuk ke akun Anda</p>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-5">
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
                className=""
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
                className=""
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-cyan-700 hover:underline">
                Lupa password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full p-4 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold transition-all duration-200"
            >
              Masuk
            </Button>

            <p className="text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <a href="#" className="text-cyan-700 font-medium hover:underline">
                Daftar di sini
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
