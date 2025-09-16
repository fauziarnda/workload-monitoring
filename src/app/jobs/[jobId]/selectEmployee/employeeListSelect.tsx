'use client';

import { organicEmployees } from '@/dummyData/organicEmp';
import { mitraColumns, mitraEmployeesData } from '@/dummyData/mitraEmp';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DataTable from '@/components/data-table';

// interface MitraRowProps {
//   emp: MitraEmployee;
//   index: number;
// }

// const MitraRow: React.FC<MitraRowProps> = ({ emp, index }) => {
//   return (
//     <tr>
//       <td className="border px-4 py-2">{index + 1}</td>
//       <td className="border px-4 py-2">{emp.nama}</td>
//       <td className="border px-4 py-2">{emp.daerahAsal}</td>
//       <td className="border px-4 py-2">{emp.jenisEmployee}</td>
//       <td className="border px-4 py-2">{emp.pengalaman.join(', ')}</td>
//     </tr>
//   );
// };

export default function EmployeeListSelect() {
  const [selectedView, setSelectedView] = useState('organik');
  const [selectedEmp, setSelectedEmp] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedEmp((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col flex-1 gap-4 ">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Select Your Employee</h3>
          <p className="text-sm font-normal">choose your employee for job</p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          {/* Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10 px-6 text-base">
                Filter
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col gap-2">
                {['SUSENAS', 'SAKERNAS', 'VHTL', 'KEPKA'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <Checkbox />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle View */}
          <div className="border-2 rounded-lg w-fit">
            <ToggleGroup
              type="single"
              defaultValue={selectedView}
              onValueChange={setSelectedView}
            >
              <ToggleGroupItem
                value="organik"
                className="h-10 px-6 text-base data-[state=on]:bg-primary data-[state=on]:text-white"
              >
                Organik
              </ToggleGroupItem>
              <ToggleGroupItem
                value="mitra"
                className="h-10 px-6 text-base data-[state=on]:bg-primary data-[state=on]:text-white"
              >
                Mitra
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-1 gap-4 ">
        <Card className="flex flex-1 flex-col p-4 overflow-y-auto">
          {selectedView === 'organik' ? (
            <CardContent className="grid grid-cols-3 gap-2 p-0 w-full">
              {organicEmployees.map((emp) => {
                const isSelected = selectedEmp.includes(emp.id);
                return (
                  <Card
                    key={emp.id}
                    onClick={() => toggleSelect(emp.id)}
                    className={`flex flex-row w-full items-center p-4 gap-4 h-fit cursor-pointer transition  ${
                      isSelected ? 'border-2 border-blue-300 bg-blue-50' : ''
                    }`}
                  >
                    <CardHeader className="p-0">
                      <Avatar className="w-24 h-24 rounded-md border">
                        <AvatarImage src="#" alt={emp.name} />
                        <AvatarFallback className="rounded-md">
                          {emp.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </CardHeader>

                    <CardContent className="flex flex-col justify-center p-0 gap-2">
                      <div className="flex flex-col gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{emp.name}</h3>
                          <p className="text-sm text-gray-500">{emp.email}</p>
                        </div>

                        <div className="flex gap-2">
                          <p className="text-sm text-white py-[2px] px-2 rounded-md bg-blue-400 w-fit">
                            {emp.department}
                          </p>
                          <p
                            className={`text-sm text-white py-[2px] px-2 rounded-md bg-green-500 w-fit ${
                              emp.status === 'Available'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {emp.status}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <DataTable columns={mitraColumns} data={mitraEmployeesData} />
            </CardContent>
          )}
        </Card>

        {selectedEmp.length > 0 && (
          <Card className="max-w-md w-full p-4">
            <h3 className="font-semibold mb-2">Employee Terpilih:</h3>
            <ul className="list-disc ml-5">
              {organicEmployees
                .filter((emp) => selectedEmp.includes(emp.id))
                .map((emp) => (
                  <li key={emp.id}>{emp.name}</li>
                ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
