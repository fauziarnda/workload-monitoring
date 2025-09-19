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
    startDate: '',
    endDate: '',
    transportAllowance: '',
    estimatedHonor: '',
    documentHonor: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex flex-col min-h-screen bg-neutral-50 ">
      <Header />

      <main className="flex flex-col flex-1 p-4 px-[80px] gap-4 overflow-hidden">
        <div>
          <h3 className="text-2xl font-bold">Create Job Form</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            velit et felis maximus porta. Duis pellentesque in quam ut congue.
          </p>
        </div>

        {/* container form isi sisa tinggi */}
        <Card className="relative w-full flex-1 overflow-hidden">
          <CardContent className="flex flex-col p-6">
            <form onSubmit={handleFirstSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="jobTitle">Name/Judul Pekerjaan</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  required
                  placeholder="Input your job name"
                  className=""
                  onChange={handleChange}
                  value={jobData.jobTitle}
                />
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
                <Label htmlFor="transportAllowance">Uang Transport</Label>
                <Input
                  id="transportAllowance"
                  name="transportAllowance"
                  type="number"
                  placeholder="Input Honor"
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
                  placeholder="Input Honor"
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
                  placeholder="Input Honor"
                  className=""
                  onChange={handleChange}
                  value={jobData.documentHonor}
                />
              </div>
              <CardHeader className="px-0 items-end pb-0">
                <Button type="submit" size="lg" className="bg-blue-950">
                  Submit
                </Button>
              </CardHeader>
            </form>
          </CardContent>
          <div className="absolute -bottom-0  w-[100%] h-[5%] bg-blue-950 "></div>
        </Card>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center ">
                  <CheckCircle className="text-brand-primary w-6 h-6" />
                  <h4 className="text-2xl font-bold text-brand-primary">
                    Success
                  </h4>
                </div>
                <p className="text-base font-regular text-brand-blackd">
                  Form telah berhasil di submit
                </p>
              </div>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction onClick={handleNavigateToNextStep}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
