'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

interface OrganikEmployee {
  id: string;
  name: string;
}

interface MitraEmployee {
  id: string;
  nama: string;
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
    jobTitle: string;
    startDate: string;
    endDate: string;
    transportAllowance: string;
    estimatedHonor: string;
    documentHonor: string;
  } | null>(null);

  useEffect(() => {
    const storedEmp = localStorage.getItem('selectedEmployees');
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
      <main className="flex flex-col flex-1 p-4 gap-4">
        <h1 className="text-2xl font-bold">Finalisasi Job</h1>
        {formData && (
          <Card className="p-4">
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        )}

        <div className="flex flex-row w-full gap-4">
          <Card className="w-full p-4">
            <CardContent className="p-0">
              {/* 🔹 Bagian Organik */}
              <div>
                <h2 className="text-xl font-semibold">Organik Terpilih</h2>
                <ul className="list-disc ml-6">
                  {employees.organik.map((emp) => (
                    <li key={emp.id}>{emp.name}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full p-4">
            <CardContent className="p-0">
              <div>
                <h2 className="text-xl font-semibold">Mitra Terpilih</h2>
                <ul className="list-disc ml-6">
                  {employees.mitra.map((emp) => (
                    <li key={emp.id}>{emp.nama}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <button
          onClick={() => {
            alert('Final Submit ✅');
            localStorage.removeItem('selectedEmployees');
            localStorage.removeItem('jobData');
          }}
          className="px-6 py-3 bg-primary text-white rounded-lg"
        >
          Final Submit
        </button>
      </main>
    </div>
  );
}
