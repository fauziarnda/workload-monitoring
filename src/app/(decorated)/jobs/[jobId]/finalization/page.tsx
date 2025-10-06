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

interface OrganikEmployee {
  id: string;
  name: string;
}

interface MitraEmployee {
  id: string;
  name: string;
}

interface SelectedEmployees {
  organik: OrganikEmployee[];
  mitra: MitraEmployee[];
}

export default function FinalizationPage() {
  const [employees, setEmployees] = useState<SelectedEmployees>({
    organik: [],
    mitra: [],
  });
  const [formData, setFormData] = useState<{
    jobTitle: '';
    jobCategory: '';
    startDate: '';
    endDate: '';
    transportAllowance: '';
    estimatedHonor: '';
    documentHonor: '';
  } | null>(null);

  useEffect(() => {
    const storedEmp = localStorage.getItem('selectedEmployees');
    console.log('Raw storedEmp:', storedEmp);
    if (storedEmp) {
      console.log('Parsed storedEmp:', JSON.parse(storedEmp));
    }
    if (storedEmp) {
      setEmployees(JSON.parse(storedEmp));
    }

    const storedForm = localStorage.getItem('jobData');
    if (storedForm) {
      setFormData(JSON.parse(storedForm));
    }
  }, []);

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

        {formData && (
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
                      value={formData.jobTitle}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobCategory">Tipe Pekerjaan</Label>
                    <Input
                      id="jobCategory"
                      name="jobCategory"
                      type="text"
                      disabled
                      value={formData.jobCategory}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Tanggal Mulai</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      disabled
                      value={formData.startDate}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="endDate">Tanggal Selesai</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      disabled
                      value={formData.endDate}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="transportAllowance">Uang Transport</Label>
                    <Input
                      id="transportAllowance"
                      name="transportAllowance"
                      type="number"
                      disabled
                      value={formData.transportAllowance}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="estimatedHonor">Perkiraan Honor</Label>
                    <Input
                      id="estimatedHonor"
                      name="estimatedHonor"
                      type="number"
                      disabled
                      value={formData.estimatedHonor}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="documentHonor">Honor per dokumen</Label>
                    <Input
                      id="documentHonor"
                      name="documentHonor"
                      type="number"
                      disabled
                      value={formData.documentHonor}
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
                onClick={() => {
                  alert('Final Submit ✅');
                  localStorage.removeItem('selectedEmployees');
                  localStorage.removeItem('jobData');
                }}
                type="submit"
                size="lg"
                className="bg-blue-950"
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
