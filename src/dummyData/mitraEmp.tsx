import { Column } from '@/components/data-table';

type MitraEmployee = {
  id: string;
  img: string;
  nama: string;
  daerahAsal: string;
  pengalaman: string[];
};

export const mitraColumns: Column<MitraEmployee>[] = [
  { key: 'img', label: 'Image' },
  { key: 'nama', label: 'Nama Mitra' },
  { key: 'daerahAsal', label: 'Daerah Asal' },
  { key: 'pengalaman', label: 'Pengalaman' },
];

export const mitraEmployeesData: MitraEmployee[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    img: 'budi.png',
    daerahAsal: 'Malang',
    pengalaman: ['SUSENAS', 'SAKERNAS'],
  },
  {
    id: '2',
    nama: 'Citra Lestari',
    img: 'citra.png',
    daerahAsal: 'Surabaya',
    pengalaman: ['KEPKA'],
  },
  {
    id: '3',
    nama: 'Rahmat Hidayat',
    img: 'rahmat.png',
    daerahAsal: 'Bandung',
    pengalaman: ['SUSENAS', 'KEPKA'],
  },
  {
    id: '4',
    nama: 'Siti Aminah',
    img: 'siti.png',
    daerahAsal: 'Jakarta',
    pengalaman: ['VHTL', 'SAKERNAS'],
  },
  {
    id: '5',
    nama: 'Dedi Pratama',
    img: 'dedi.png',
    daerahAsal: 'Yogyakarta',
    pengalaman: ['SUSENAS'],
  },
  {
    id: '6',
    nama: 'Lina Marlina',

    img: 'lina.png',
    daerahAsal: 'Semarang',
    pengalaman: ['KEPKA', 'VHTL'],
  },
  {
    id: '7',
    nama: 'Ahmad Fauzi',

    img: 'fauzi.png',
    daerahAsal: 'Medan',
    pengalaman: ['SAKERNAS'],
  },
  {
    id: '8',
    nama: 'Nurul Aisyah',
    img: 'nurul.png',
    daerahAsal: 'Makassar',
    pengalaman: ['SUSENAS', 'VHTL'],
  },
];
