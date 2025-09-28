'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import Header from '@/components/headernav';

export default function CreateJobForm() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [newJobId, setNewJobId] = useState<string | null>(null);
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobCategory: '',
    startDate: '',
    endDate: '',
    transportAllowance: '',
    estimatedHonor: '',
    documentHonor: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFirstSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dummyJobId = `dummy-job-${Date.now()}`;
    console.log('Generated dummy ID: ', dummyJobId);

    const isSuccess = true;
    if (isSuccess) {
      localStorage.setItem('jobData', JSON.stringify(jobData));
      setNewJobId(dummyJobId);
      setOpenAlert(true);
    }
  };

  const handleNavigateToNextStep = () => {
    // Tutup dialog
    setOpenAlert(false);
    // 3. Gunakan ID yang tersimpan untuk navigasi ke halaman selanjutnya
    if (newJobId) {
      router.push(`/jobs/${newJobId}/selectEmployee`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 pt-4 pb-8 px-[80px] gap-4 overflow-hidden">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold text-white">Create Job Form</h3>
          <p className=" text-base text-neutral-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            velit et felis maximus porta. Duis pellentesque in quam ut congue.
          </p>
        </div>

        {/* container form isi sisa tinggi */}
        <Card className="relative w-full flex-1 overflow-hidden">
          <CardContent className="flex flex-col p-6">
            <form onSubmit={handleFirstSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="jobTitle">Nama Pekerjaan</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  required
                  placeholder="Masukkan nama atau judul pekerjaan"
                  className=""
                  onChange={handleChange}
                  value={jobData.jobTitle}
                />
              </div>
              <div>
                <Label htmlFor="jobCategory">Jenis Pekerjaan</Label>
                <select
                  id="jobCategory"
                  name="jobCategory"
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:text-muted-fmd:text-sm"
                  onChange={handleChange}
                  value={jobData.jobCategory}
                >
                  <option value="" disabled>
                    Pilih jenis pekerjaan
                  </option>
                  <option value="Sensus/Survey" className="">
                    Sensus/Survey
                  </option>
                  <option value="Kegiatan Lain">Kegiatan Lain</option>
                </select>
              </div>
              <div>
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  placeholder="Input job start date"
                  className=""
                  onChange={handleChange}
                  value={jobData.startDate}
                />
              </div>
              <div className="">
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  required
                  placeholder="Input job end date"
                  className=""
                  onChange={handleChange}
                  value={jobData.endDate}
                />
              </div>
              <div className="">
                <Label htmlFor="transportAllowance">Transport Lokal</Label>
                <Input
                  id="transportAllowance"
                  name="transportAllowance"
                  type="number"
                  placeholder="Masukkan transport lokal per hari"
                  className=""
                  onChange={handleChange}
                  value={jobData.transportAllowance}
                />
              </div>
              <div className="">
                <Label htmlFor="estimatedHonor">Perkiraan Honor</Label>
                <Input
                  id="estimatedHonor"
                  name="estimatedHonor"
                  type="number"
                  placeholder="Masukkan perkiraan honor mitra (Rp)"
                  className=""
                  onChange={handleChange}
                  value={jobData.estimatedHonor}
                />
              </div>
              <div className="">
                <Label htmlFor="documentHonor">Honor per dokumen</Label>
                <Input
                  id="documentHonor"
                  name="documentHonor"
                  type="number"
                  placeholder="Masukkan jumlah honor mitra per dokumen"
                  className=""
                  onChange={handleChange}
                  value={jobData.documentHonor}
                />
              </div>
              <CardHeader className="px-0 items-end pb-0">
                <Button type="submit" size="lg" className="bg-brand-primary">
                  Submit
                </Button>
              </CardHeader>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center ">
                  <CheckCircle className="text-brand-primary w-6 h-6 text-blue-950" />
                  <h4 className="text-2xl font-bold text-brand-primary text-blue-950">
                    Success
                  </h4>
                </div>
                <p className="text-base font-regular text-brand-blackd">
                  Form telah berhasil di submit
                </p>
              </div>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction
                onClick={handleNavigateToNextStep}
                className="bg-brand-primary "
              >
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
