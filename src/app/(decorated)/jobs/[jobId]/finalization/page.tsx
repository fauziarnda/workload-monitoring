'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import Header from '@/components/headernav';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Database } from '@/types/supabase';

interface OrganikEmployee {
  id: string;
  name: string;
}

interface MitraEmployee {
  id: string;
  name: string;
}

type SelectedEmployees = {
  organik: OrganikEmployee[]; // Ganti `any` dengan tipe Employee Anda
  mitra: MitraEmployee[];
};

type JobRow = Database['public']['Tables']['jobs']['Row'];

export default function FinalizationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { jobId } = useParams();
  const [employees, setEmployees] = useState<SelectedEmployees>({
    organik: [],
    mitra: [],
  });

  const [jobData, setJobData] = useState<JobRow | null>(null);

  useEffect(() => {
    const storedEmp = localStorage.getItem('selectedEmployees');
    if (storedEmp) {
      setEmployees(JSON.parse(storedEmp));
    }
  }, []);

  useEffect(() => {
    if (typeof jobId !== 'string') {
      console.error('Job ID tidak valid atau berupa array:', jobId);
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
      } else {
        setJobData(data);
      }
    };

    fetchData();
  }, [jobId]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    if (typeof jobId !== 'string') {
      setError('ID Pekerjaan tidak valid.');
      setIsLoading(false);
      return;
    }

    const allSelectedEmployees = [...employees.organik, ...employees.mitra];

    if (allSelectedEmployees.length === 0) {
      setError('Tidak ada pegawai yang dipilih untuk disimpan.');
      setIsLoading(false);
      return;
    }

    const payload = allSelectedEmployees.map((employee) => ({
      job_id: jobId,
      employee_id: employee.id,
    }));

    try {
      const { error: insertError } = await supabase
        .from('job_assignments')
        .insert(payload);

      if (insertError) {
        throw insertError;
      }

      localStorage.removeItem('selectedEmployees');
      alert('Pegawai berhasil ditugaskan!'); // Ganti dengan notifikasi yang lebih baik
      router.push(`/dashboard/teamlead`); // Arahkan ke halaman detail pekerjaan
    } catch (err: any) {
      console.error('Gagal menyimpan penugasan pegawai:', err);
      setError('Terjadi kesalahan saat menyimpan data. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 pt-4 pb-8 px-[80px] gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white">
            Finalisasi Pekerjaan
          </h1>
          <p className=" text-base text-neutral-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            velit et felis maximus porta. Duis pellentesque in quam ut congue.
          </p>
        </div>

        {jobData && (
          <Card className="relative w-full flex-1 overflow-hidden">
            <CardContent className="flex flex-col p-6 ">
              <div className="flex flex-row w-full">
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <Label htmlFor="jobTitle">Name/Judul Pekerjaan</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      disabled
                      value={jobData.title}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobCategory">Tipe Pekerjaan</Label>
                    <Input
                      id="jobCategory"
                      name="jobCategory"
                      type="text"
                      disabled
                      value={jobData.type ?? ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      disabled
                      value={jobData.start_date ?? ''}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      disabled
                      value={jobData.end_date ?? ''}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="transportAllowance">Uang Transport</Label>
                    <Input
                      id="transportAllowance"
                      name="transportAllowance"
                      type="number"
                      disabled
                      value={jobData.transport_allowance ?? ''}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="estimatedHonor">Perkiraan Honor</Label>
                    <Input
                      id="estimatedHonor"
                      name="estimatedHonor"
                      type="number"
                      disabled
                      value={jobData.estimated_honorarium ?? ''}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="documentHonor">Honor per dokumen</Label>
                    <Input
                      id="documentHonor"
                      name="documentHonor"
                      type="number"
                      disabled
                      value={jobData.honor_document_basis ?? ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full pl-4 p-0 max-w-2xl">
                  <Card className="p-0 min-h-64 shadow-none">
                    <CardHeader className="p-4">
                      <CardTitle className="">Pegawai Organik :</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4">
                      {/* 🔹 Bagian Organik */}
                      <div>
                        <ul className="list-disc ml-5 ">
                          {employees.organik.map((emp) => (
                            <li key={emp.id}>{emp.name}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="p-0 min-h-64 shadow-none">
                    <CardHeader className="p-4">
                      <CardTitle className="">Pegawai Mitra :</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4">
                      <div>
                        <ul className="list-disc ml-5 ">
                          {employees.mitra.map((emp) => (
                            <li key={emp.id}>{emp.name}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-end mt-auto">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                type="submit"
                size="lg"
                className="bg-blue-950"
              >
                {isLoading ? 'Menyimpan...' : 'Submit & Finalisasi'}
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
