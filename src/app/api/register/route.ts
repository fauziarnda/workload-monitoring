// app/api/register/route.js

import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // 1. Validasi input dasar
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Nama, email, dan password diperlukan.' },
        { status: 400 }
      );
    }

    // 2. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10); // Angka 10 adalah salt rounds

    // 4. Simpan pengguna baru ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Kirim respons sukses
    // Jangan pernah kirim password kembali, bahkan yang sudah di-hash
    return NextResponse.json(
      {
        user: { name: newUser.name, email: newUser.email },
        message: 'User berhasil dibuat.',
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
