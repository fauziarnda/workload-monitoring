'use client';

import { mitraColumns, mitraEmployeesData } from '@/dummyData/mitraEmp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Key } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { supabase } from '@/lib/supabase/client';
import { OrganikType, MitraType } from '@/types/employee';
import React from 'react';

const PAGE_SIZE = 50;

function getNestedValue(obj: any, path: string): any {
  if (!path) return undefined;

  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const attributeLabels: Record<string, string> = {
  title: 'Nama Pekerjaan',
  type: 'Tipe Pekerjaan',
  status: 'Status',
  start_date: 'Tanggal Mulai',
  end_date: 'Tanggal Selesai',
  estimated_honorarium: 'Estimasi Honorarium',
  transport_allowance: 'Tunjangan Transportasi',
  honor_document_basis: 'Dasar Dokumen Honor',
};

const hiddenAttributes = ['id', 'created_at', 'created_by', 'img_url'];

export default function EmployeeListSelect() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { jobId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<number[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedView, setSelectedView] = useState('organik');
  const [selectedEmp, setSelectedEmp] = useState<string[]>([]);
  const [selectedMitra, setSelectedMitra] = useState<Record<string, boolean>>(
    {}
  );

  const [selectedDetails, setSelectedDetails] = useState<MitraType | null>(
    null
  );

  const [organicEmployees, setOrganicEmployees] = useState<OrganikType[]>([]);
  const [mitraEmployees, setMitraEmployees] = useState<MitraType[]>([]);
  const [filterExperience, setFilterExperience] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalMitra, setTotalMitra] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedView === 'organik') {
        if (organicEmployees.length === 0) {
          const { data, error } = await supabase
            .from('employees')
            .select(
              `
                *,
                employee_organik_details(*),
                organik_work_history(*)
              `
            )
            .eq('employee_type', 'Organik');

          if (error) throw error;
          setOrganicEmployees(data || []);
        }
      } else if (selectedView === 'mitra') {
        if (totalMitra === 0) {
          const { count, error: countError } = await supabase
            .from('employees')
            .select('*', { count: 'exact', head: true })
            .eq('employee_type', 'Mitra');
          if (countError) throw countError;
          setTotalMitra(count || 0);
        }

        const from = currentPage * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error } = await supabase
          .from('employees')
          .select(
            `
              *,
              employee_mitra_details(*),
              mitra_experiences(*, experience_types(*))
            `
          )
          .eq('employee_type', 'Mitra')
          .range(from, to);

        if (error) throw error;
        setMitraEmployees(data || []);
      }
    };

    fetchData();
  }, [selectedView, currentPage]);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from('experience_types')
        .select('*');

      if (error) throw error;
      setFilterExperience(data || []);
    };

    fetchExperience();
  }, []);

  const selectedCount = Object.values(selectedMitra).filter(Boolean).length;
  const selectedEmployee = selectedEmp.length > 0 || selectedCount > 0;

  function toggleSelectMitra(id: string) {
    setSelectedMitra((prev) => ({ ...prev, [id]: !prev[id] }));
    console.log(selectedMitra);
  }

  const toggleSelect = (id: string) => {
    setSelectedEmp((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSeeDetails = (empId: string | number) => {
    const employee = mitraEmployees.find((emp) => emp.id === empId);
    setSelectedDetails(employee ?? null);
  };

  const handleSubmit = async () => {
    const selectedOrganik = organicEmployees.filter((emp) =>
      selectedEmp.includes(emp.id)
    );
    const selectedMitraList = mitraEmployees.filter(
      (emp) => selectedMitra[emp.id]
    );

    console.log('Selected organik', selectedOrganik);
    console.log('Selected mitra', selectedMitraList);

    localStorage.setItem(
      'selectedEmployees',
      JSON.stringify({ organik: selectedOrganik, mitra: selectedMitraList })
    );

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
          {selectedView === 'mitra' && (
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
                {filterExperience.map((exp) => (
                  <DropdownMenuCheckboxItem
                    key={exp.id}
                    checked={selectedFilter.includes(exp.id)}
                    onCheckedChange={(checked) => {
                      setSelectedFilter((prev) =>
                        checked
                          ? [...selectedFilter, exp.id]
                          : prev.filter((id) => id !== exp.id)
                      );
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {exp.name}
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
          )}

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
                          <p className="text-sm text-gray-500">
                            {emp.employee_type}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <p className="text-xs text-white py-[2px] px-2 rounded-md bg-blue-400 w-fit">
                            {emp.employee_organik_details?.department}
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
                  {mitraEmployees
                    .filter((row) => {
                      if (selectedFilter.length === 0) return true;

                      return row.mitra_experiences?.some((exp: any) =>
                        selectedFilter.includes(exp.experience_type_id)
                      );
                    })
                    .map((row) => {
                      const isSelected = !!selectedMitra[row.id];

                      return (
                        <TableRow
                          key={row.id}
                          className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                            isSelected ? 'bg-muted/70' : ''
                          }`}
                          role="row"
                          aria-selected={isSelected}
                        >
                          <TableCell onClick={() => toggleSelectMitra(row.id)}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelectMitra(row.id)}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Pilih ${row.id}`}
                            />
                          </TableCell>

                          {mitraColumns.map((col) => (
                            <TableCell key={col.key}>
                              {col.cell
                                ? col.cell({ row })
                                : (() => {
                                    const cellValue = getNestedValue(
                                      row,
                                      col.key
                                    );
                                    if (col.key === 'img_url') {
                                      return (
                                        <Avatar>
                                          <AvatarImage
                                            src={cellValue || ''}
                                            alt={row.name}
                                          />
                                          <AvatarFallback>
                                            {row.name ? row.name[0] : '?'}
                                          </AvatarFallback>
                                        </Avatar>
                                      );
                                    }
                                    return String(cellValue || '-');
                                  })()}
                            </TableCell>
                          ))}

                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  onClick={() => handleSeeDetails(row.id)}
                                  variant="link"
                                  className="p-0"
                                >
                                  See Detail
                                </Button>
                              </DialogTrigger>

                              {selectedDetails && (
                                <DialogContent className="flex flex-col sm:max-w-lg p-2">
                                  <DialogHeader className="flex flex-col justify-center items-center ">
                                    <DialogTitle>
                                      Personal Informastion
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detail dari profil mitra
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Avatar className="w-28 h-28 rounded-md border self-center my-4">
                                    <AvatarImage
                                      src={selectedDetails.img_url || '#'}
                                      alt={selectedDetails.name}
                                    />
                                    <AvatarFallback className="rounded-md text-2xl">
                                      {selectedDetails.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>

                                  <div className="grid grid-cols-[180px_1fr] items-center gap-x-4 gap-y-2 p-4 mb-4 text-base">
                                    <p className="font-semibold text-gray-600">
                                      Nama
                                    </p>
                                    <p>: {selectedDetails.name || '-'}</p>

                                    <p className="font-semibold text-gray-600">
                                      Tipe
                                    </p>
                                    <p>
                                      : {selectedDetails.employee_type || '-'}
                                    </p>

                                    <p className="font-semibold text-gray-600">
                                      Tanggal Lahir
                                    </p>
                                    <p>
                                      :{' '}
                                      {selectedDetails.employee_mitra_details
                                        ?.date_of_birth || '-'}
                                    </p>

                                    <p className="font-semibold text-gray-600">
                                      Pendidikan
                                    </p>
                                    <p>
                                      :{' '}
                                      {selectedDetails.employee_mitra_details
                                        ?.last_education || '-'}
                                    </p>

                                    <p className="font-semibold text-gray-600">
                                      Kecamatan
                                    </p>
                                    <p>
                                      :{' '}
                                      {selectedDetails.employee_mitra_details
                                        ?.village || '-'}
                                    </p>

                                    <p className="font-semibold text-gray-600">
                                      Desa
                                    </p>
                                    <p>
                                      :{' '}
                                      {selectedDetails.employee_mitra_details
                                        ?.sub_district || '-'}
                                    </p>

                                    <p className="font-semibold text-gray-600">
                                      Pengalaman Mitra
                                    </p>
                                    <p>
                                      :{' '}
                                      {selectedDetails.mitra_experiences.map(
                                        (exp: any) => (
                                          <span
                                            key={exp.id}
                                            className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full"
                                          >
                                            {exp.experience_types?.name ||
                                              'N/A'}
                                          </span>
                                        )
                                      )}
                                    </p>
                                  </div>
                                </DialogContent>
                              )}
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
                      {mitraEmployees
                        .filter((emp) => selectedMitra[emp.id])
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
            </CardContent>
            <div className="absolute bottom-0 left-8 -rotate-45 w-[150%] h-[20%] bg-blue-950 translate-y-10 "></div>
          </Card>
        )}
      </div>
    </div>
  );
}
