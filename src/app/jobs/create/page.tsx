'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

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
    <div className="flex flex-col min-h-screen ">
      <header className="flex justify-between border-b items-start p-4">
        <div>
          <h1 className="text-2xl font-bold">Hello Team Leader</h1>
          <p>lorem ipsum dolor sit amet</p>
        </div>

        <Card className="flex py-2 px-4 gap-2 items-center">
          <Avatar className="w-[36px] h-[36px] rounded-full border">
            <AvatarImage src="#" alt="avatar" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="truncate font-medium text-base">
              Tejo Sutrisno
            </span>
            <span className="truncate text-xs">tejo@example.com</span>
          </div>
          <ChevronDown />
        </Card>
      </header>

      <main className="flex flex-col flex-1 p-4 gap-4 overflow-hidden">
        <div>
          <h3 className="text-2xl font-bold">Create Job Form</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            velit et felis maximus porta. Duis pellentesque in quam ut congue.
          </p>
        </div>

        {/* container form isi sisa tinggi */}
        <Card className="w-full flex-1">
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
                <Button type="submit" size="lg" className="">
                  Submit
                </Button>
              </CardHeader>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
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
