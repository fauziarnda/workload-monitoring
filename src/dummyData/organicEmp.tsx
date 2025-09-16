export interface OrganicAttribute {
  id: number;
  name: string;
  email: string;
  department: string;
  status: 'Available' | 'On Duty';
}

export const organicEmployees: OrganicAttribute[] = [
  {
    id: 1,
    name: 'Tejo Sutrisno',
    email: 'tejo@example.com',
    department: 'Pelayanan Umum',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Siti Rahmawati',
    email: 'siti.rahma@example.com',
    department: 'Keuangan',
    status: 'On Duty',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    department: 'Teknologi Informasi',
    status: 'Available',
  },
  {
    id: 4,
    name: 'Dewi Anggraini',
    email: 'dewi.anggra@example.com',
    department: 'Kepegawaian',
    status: 'On Duty',
  },
  {
    id: 5,
    name: 'Agus Wibowo',
    email: 'agus.wibowo@example.com',
    department: 'Humas',
    status: 'Available',
  },
  {
    id: 6,
    name: 'Ratna Puspita',
    email: 'ratna.puspita@example.com',
    department: 'Pelayanan Umum',
    status: 'On Duty',
  },
  {
    id: 7,
    name: 'Andi Prasetyo',
    email: 'andi.prasetyo@example.com',
    department: 'Keuangan',
    status: 'Available',
  },
  {
    id: 8,
    name: 'Maya Sari',
    email: 'maya.sari@example.com',
    department: 'Teknologi Informasi',
    status: 'On Duty',
  },
  {
    id: 9,
    name: 'Rizky Hidayat',
    email: 'rizky.hidayat@example.com',
    department: 'Humas',
    status: 'Available',
  },
  {
    id: 10,
    name: 'Fitri Amelia',
    email: 'fitri.amelia@example.com',
    department: 'Kepegawaian',
    status: 'On Duty',
  },
  {
    id: 11,
    name: 'Doni Saputra',
    email: 'doni.saputra@example.com',
    department: 'Pelayanan Umum',
    status: 'Available',
  },
  {
    id: 12,
    name: 'Lina Kurniawati',
    email: 'lina.kurnia@example.com',
    department: 'Teknologi Informasi',
    status: 'On Duty',
  },
];
