'use client';

import { organicEmployees } from '@/dummyData/organicEmp';
import { mitraColumns, mitraEmployeesData } from '@/dummyData/mitraEmp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function EmployeeListSelect() {
  const [selectedView, setSelectedView] = useState('organik');
  const [selectedEmp, setSelectedEmp] = useState<string[]>([]);
  const [selectedMitra, setSelectedMitra] = useState<Record<string, boolean>>(
    {}
  );

  const selectedCount = Object.values(selectedMitra).filter(Boolean).length;
  const selectedEmployee = selectedEmp.length > 0 || selectedCount > 0;

  function toggleSelectMitra(id: string) {
    setSelectedMitra((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const toggleSelect = (id: string) => {
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
              <Button
                variant="outline"
                className="h-11 border-2 rounded-lg px-6 text-base"
              >
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
              value={selectedView}
              onValueChange={(value) => {
                if (value) {
                  setSelectedView(value);
                } else {
                  setSelectedView(
                    selectedView === 'organik' ? 'mitra' : 'organik'
                  );
                }
              }}
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
              <Table className="overflow-hidden rounded-md">
                <TableHeader>
                  <TableRow className="bg-neutral-500 hover:!bg-none text-white">
                    <TableHead className="text-white font-semibold">
                      Checkbox
                    </TableHead>
                    {mitraColumns.map((col) => (
                      <TableHead
                        key={String(col.key)}
                        className="text-white font-semibold"
                      >
                        {col.label}
                      </TableHead>
                    ))}
                    <TableHead className="text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {mitraEmployeesData.map((row) => {
                    const isSelected = !!selectedMitra[row.id];
                    return (
                      <TableRow
                        key={row.id}
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                          isSelected ? 'bg-muted/70' : ''
                        }`}
                        onClick={() => toggleSelectMitra(row.id)}
                        role="row"
                        aria-selected={isSelected}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelectMitra(row.id)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Pilih ${row.id}`}
                          />
                        </TableCell>
                        {mitraColumns.map((col) => (
                          <TableCell key={String(col.key)}>
                            {String(row[col.key])}
                          </TableCell>
                        ))}

                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                variant="link"
                                className="p-0"
                              >
                                See Detail
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="flex flex-col sm:max-w-lg items-center justify-center text-center">
                              <DialogHeader className="flex flex-col justify-center text-center">
                                <DialogTitle>Personal Informastion</DialogTitle>
                                <DialogDescription>
                                  Detail dari employee
                                </DialogDescription>
                              </DialogHeader>

                              <Avatar className="w-24 h-24 rounded-md border">
                                <AvatarImage src="#" alt="name" />
                                <AvatarFallback className="rounded-md">
                                  A
                                </AvatarFallback>
                              </Avatar>

                              <div className="mt-2 space-y-2">
                                <p>Nama Pegawai : Lorem Ipsum Dolor</p>
                                <p>Daerah Asal : Malang</p>
                                <p>Pengalaman Kerja</p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          )}
        </Card>

        {selectedEmployee && (
          <Card className="max-w-md w-full p-4 gap-12">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold mb-2">
                Employee Terpilih:
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 p-0 gap-4">
              <Card className="p-0">
                <CardHeader className="p-4">
                  <CardTitle className="">Organik Terpilih:</CardTitle>
                </CardHeader>
                <CardContent className="">
                  {selectedEmp.length > 0 && (
                    <ul className="list-disc ml-5">
                      {organicEmployees
                        .filter((emp) => selectedEmp.includes(emp.id))
                        .map((emp) => (
                          <li key={emp.id}>{emp.name}</li>
                        ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card className="p-0">
                <CardHeader className="p-4">
                  <CardTitle className="">Mitra Terpilih:</CardTitle>
                </CardHeader>
                <CardContent className="">
                  {selectedCount > 0 && (
                    <ul className="list-disc ml-5">
                      {mitraEmployeesData
                        .filter((emp) => selectedMitra[emp.id]) // ✅ cek dari object
                        .map((emp) => (
                          <li key={emp.id}>{emp.nama}</li>
                        ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
