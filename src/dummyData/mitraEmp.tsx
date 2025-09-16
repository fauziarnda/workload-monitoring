export interface MitraEmployee {
  id: number;
  nama: string;
  jenisEmployee: string;
  daerahAsal: string;
  img: string;
  pengalaman: string[];
}

export const mitraEmployees: MitraEmployee[] = [
  {
    id: 1,
    nama: 'Budi Santoso',
    jenisEmployee: 'Mitra',
    img: 'budi.png',
    daerahAsal: 'Malang',
    pengalaman: ['SUSENAS', 'SAKERNAS'],
  },
  {
    id: 2,
    nama: 'Citra Lestari',
    jenisEmployee: 'Mitra',
    img: 'citra.png',
    daerahAsal: 'Surabaya',
    pengalaman: ['KEPKA'],
  },
  {
    id: 3,
    nama: 'Rahmat Hidayat',
    jenisEmployee: 'Mitra',
    img: 'rahmat.png',
    daerahAsal: 'Bandung',
    pengalaman: ['SUSENAS', 'KEPKA'],
  },
  {
    id: 4,
    nama: 'Siti Aminah',
    jenisEmployee: 'Mitra',
    img: 'siti.png',
    daerahAsal: 'Jakarta',
    pengalaman: ['VHTL', 'SAKERNAS'],
  },
  {
    id: 5,
    nama: 'Dedi Pratama',
    jenisEmployee: 'Mitra',
    img: 'dedi.png',
    daerahAsal: 'Yogyakarta',
    pengalaman: ['SUSENAS'],
  },
  {
    id: 6,
    nama: 'Lina Marlina',
    jenisEmployee: 'Mitra',
    img: 'lina.png',
    daerahAsal: 'Semarang',
    pengalaman: ['KEPKA', 'VHTL'],
  },
  {
    id: 7,
    nama: 'Ahmad Fauzi',
    jenisEmployee: 'Mitra',
    img: 'fauzi.png',
    daerahAsal: 'Medan',
    pengalaman: ['SAKERNAS'],
  },
  {
    id: 8,
    nama: 'Nurul Aisyah',
    jenisEmployee: 'Mitra',
    img: 'nurul.png',
    daerahAsal: 'Makassar',
    pengalaman: ['SUSENAS', 'VHTL'],
  },
];
