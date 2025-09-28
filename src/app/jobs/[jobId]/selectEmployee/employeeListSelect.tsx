'use client';

import { organicEmployees } from '@/dummyData/organicEmp';
import { mitraColumns, mitraEmployeesData } from '@/dummyData/mitraEmp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useParams, useRouter } from 'next/navigation';

export default function EmployeeListSelect() {
  const router = useRouter();
  const { jobId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedView, setSelectedView] = useState('organik');
  const [selectedEmp, setSelectedEmp] = useState<string[]>([]);
  const [selectedMitra, setSelectedMitra] = useState<Record<string, boolean>>(
    {}
  );

  const filterOption = ['SUSENAS', 'SAKERNAS', 'VHTL', 'KEPKA'];

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

  const handleSubmit = () => {
    // ambil data organik & mitra yang kepilih
    const selectedOrganik = organicEmployees.filter((emp) =>
      selectedEmp.includes(emp.id)
    );

    const selectedMitraList = mitraEmployeesData.filter(
      (emp) => selectedMitra[emp.id]
    );

    // simpan ke localStorage
    localStorage.setItem(
      'selectedEmployees',
      JSON.stringify({ organik: selectedOrganik, mitra: selectedMitraList })
    );

    // redirect ke halaman finalisasi
    router.push(`/jobs/${jobId}/finalization`);
  };

  return (
    <div className="flex flex-col flex-1 gap-4 ">
      <div className="flex flex-row justify-between items-end">
        <div>
          <h3 className="flex items-center gap-3 text-3xl font-bold text-white">
            Select Your Employee
          </h3>
          <p className="text-base text-neutral-200">
            choose your employee for job
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <DropdownMenu
            open={openFilter}
            onOpenChange={(o) => {
              setOpenFilter(o);
              if (!o) {
                console.log('Filter applied:', selectedFilter);
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 border-none rounded-md bg-brand-primary text-white"
              >
                Filter by experience
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Experience</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOption.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={selectedFilter.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFilter([...selectedFilter, option]);
                    } else {
                      setSelectedFilter(
                        selectedFilter.filter((o) => o !== option)
                      );
                    }
                  }}
                  onSelect={(e) => e.preventDefault()}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <div className="p-2">
                <Button
                  size="sm"
                  className="w-full bg-blue-950"
                  onClick={() => {
                    console.log('Filter applied:', selectedFilter);
                    setOpenFilter(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ToggleGroup
            className="border-2 border-brand-primary bg-white h-10 rounded-md overflow-hidden items-center "
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
              className="px-6 rounded-sm text-base data-[state=on]:bg-brand-primary data-[state=on]:text-white"
            >
              Organik
            </ToggleGroupItem>

            <ToggleGroupItem
              value="mitra"
              className="px-6 rounded-sm text-base data-[state=on]:bg-brand-primary data-[state=on]:text-white"
            >
              Mitra
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="flex flex-row flex-1 gap-4 ">
        <Card className="flex flex-1 flex-col p-4 overflow-y-auto">
          {selectedView === 'organik' ? (
            <CardContent
              className={`grid gap-2 p-0 w-full ${
                selectedEmployee ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {organicEmployees.map((emp) => {
                const isSelected = selectedEmp.includes(emp.id);
                return (
                  <Card
                    key={emp.id}
                    onClick={() => toggleSelect(emp.id)}
                    className={`flex flex-row w-full items-center p-3 gap-4 cursor-pointer transition  ${
                      isSelected ? 'border-2 border-blue-300 bg-blue-50' : ''
                    }`}
                  >
                    <CardHeader className="p-0">
                      <Avatar className="w-20 h-20 rounded-md border">
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
                          <p className="text-xs text-white py-[2px] px-2 rounded-md bg-blue-400 w-fit">
                            {emp.department}
                          </p>
                          <p
                            className={`text-xs text-white py-[2px] px-2 rounded-md bg-green-500 w-fit ${
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
                  <TableRow className="bg-blue-950 hover:!bg-none text-white">
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
                            {col.key === 'img' ? (
                              <Avatar>
                                <AvatarImage
                                  src={String(row[col.key])}
                                  alt={row.nama}
                                />
                                <AvatarFallback className="bg-neutral-300">
                                  {row.nama[0]}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              String(row[col.key])
                            )}
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

                            <DialogContent className="flex flex-col sm:max-w-lg p-2">
                              <DialogHeader className="flex flex-col justify-center items-center ">
                                <DialogTitle>Personal Informastion</DialogTitle>
                                <DialogDescription>
                                  Detail dari employee
                                </DialogDescription>
                              </DialogHeader>
                              <Avatar className="flex flex-col max-w-32 w-full h-32 rounded-md border justify-center items-center self-center">
                                <AvatarImage src="#" alt="name" />
                                <AvatarFallback className="rounded-md">
                                  A
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col gap-4 p-4 ">
                                <div className="mt-2 space-y-2">
                                  <p>NAMA : JOHN DOE</p>
                                  <p>SOBAT ID : 012345678</p>
                                  <p>USIA : 25</p>
                                  <p>TANGGAL LAHIR : 01 JANUARI 1999</p>

                                  <p>DAERAH ASAL : SUMBERSARI, LOWOKWARU</p>
                                  <p>PENDIDIKAN TERAKHIR : S1</p>
                                  <p className="flex gap-1">
                                    PENGALAMAN :{' '}
                                    <span className="px-2 py-0 bg-brand-secondary rounded-full">
                                      SAKERNAS
                                    </span>
                                    <span className="px-2 py-0 bg-brand-secondary rounded-full">
                                      SAKERNAS
                                    </span>
                                  </p>
                                </div>
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

          <div className="flex flex-col items-end py-8">
            <Button
              onClick={handleSubmit}
              type="submit"
              size="lg"
              className="bg-blue-950"
            >
              Submit
            </Button>
          </div>
        </Card>

        {selectedEmployee && (
          <Card className="relative overflow-hidden max-w-sm w-full p-4 space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold mb-2 flex flex-row justify-between ">
                Employee Terpilih:
                <Button size="sm" variant="outline">
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 p-0 gap-4">
              <Card className="p-0 min-h-64">
                <CardHeader className="p-4">
                  <CardTitle className="">Organik Terpilih: </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  {selectedEmp.length > 0 ? (
                    <ul className="list-disc ml-5">
                      {organicEmployees
                        .filter((emp) => selectedEmp.includes(emp.id))
                        .map((emp) => (
                          <li key={emp.id}>{emp.name}</li>
                        ))}
                    </ul>
                  ) : (
                    <div className="p-16 h-full text-center justify-center text-neutral-400">
                      There&apos;s no employee selected
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="p-0 min-h-64">
                <CardHeader className="p-4">
                  <CardTitle className="">Mitra Terpilih :</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  {selectedCount > 0 ? (
                    <ul className="list-disc ml-5">
                      {mitraEmployeesData
                        .filter((emp) => selectedMitra[emp.id]) // ✅ cek dari object
                        .map((emp) => (
                          <li key={emp.id}>{emp.nama}</li>
                        ))}
                    </ul>
                  ) : (
                    <div className="p-16 h-full text-center justify-center text-neutral-400">
                      There&apos;s no employee selected
                    </div>
                  )}
                </CardContent>
              </Card>
            </CardContent>
            <div className="absolute bottom-0 left-8 -rotate-45 w-[150%] h-[20%] bg-blue-950 translate-y-10 "></div>
          </Card>
        )}
      </div>
    </div>
  );
}
