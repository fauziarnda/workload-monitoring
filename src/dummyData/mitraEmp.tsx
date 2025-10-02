import { Column } from '@/components/data-table';

type MitraEmployee = {
  id: string;
  img: string;
  nama: string;
  daerahAsal: string;
  pengalaman: string[];
};

// export const mitraColumns: Column<MitraEmployee>[] = [
//   { key: 'img', label: 'Image' },
//   { key: 'nama', label: 'Nama Mitra' },
//   { key: 'daerahAsal', label: 'Daerah Asal' },
//   { key: 'pengalaman', label: 'Pengalaman' },
// ];

export const mitraColumns = [
  {
    key: 'img_url',
    label: 'Foto',
  },
  {
    key: 'name',
    label: 'Nama Mitra',
  },
  {
    key: 'employee_mitra_details.date_of_birth',
    label: 'Tanggal Lahir',
  },
  {
    key: 'employee_mitra_details.last_education',
    label: 'Pendidikan',
  },
  {
    key: 'employee_mitra_details.village',
    label: 'Desa',
  },
  {
    key: 'employee_mitra_details.sub_district',
    label: 'Kecamatan',
  },
  {
    key: 'mitra_experiences',
    label: 'Pengalaman',
    cell: ({ row }: { row: any }) => {
      // Ambil data pengalaman dari baris saat ini
      const experiences = row.mitra_experiences;

      // Jika tidak ada pengalaman, tampilkan strip
      if (!experiences || experiences.length === 0) {
        return <span>-</span>;
      }

      // Jika ada, map array tersebut menjadi elemen JSX
      return (
        <div className="flex flex-wrap gap-1">
          {experiences.map((exp: any) => (
            <span
              key={exp.id}
              className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full"
            >
              {exp.experience_types?.name || 'N/A'}
            </span>
          ))}
        </div>
      );
    },
  },
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
