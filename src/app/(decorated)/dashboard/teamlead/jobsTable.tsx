import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/types/supabase';
import React from 'react';
import { useEffect, useState } from 'react';

type JobRow = Database['public']['Tables']['jobs']['Row'];
type JobAssign = Database['public']['Tables']['job_assignments']['Row'];
type Employee = Database['public']['Tables']['employees']['Row'];

// 1. Buat tipe untuk assignment yang sudah menyertakan data employee
type JobAssignmentWithEmployee = JobAssign & {
  employees: Employee;
};

// 2. Buat tipe utama yang menggabungkan JobRow dengan assignment-nya
type JobWithAssignments = JobRow & {
  job_assignments: JobAssignmentWithEmployee[];
};

const jobsColumn = [
  {
    key: 'title',
    label: 'Nama/Judul Pekerjaan',
  },
  {
    key: 'start_date',
    label: 'Tanggal Mulai',
  },
  {
    key: 'end_date',
    label: 'Tanggal Selesai',
  },
  {
    key: 'status',
    label: 'Status',
  },
];

const statusColorMap: { [key: string]: string } = {
  DRAFT: 'bg-gray-200 text-gray-800',
  ONGOING: 'bg-blue-200 text-blue-800',
  FINALIZED: 'bg-purple-200 text-purple-800',
  COMPLETED: 'bg-green-200 text-green-800',
};

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

const hiddenAttributes = ['id', 'created_at', 'created_by', 'job_assignments'];

export default function JobsTable() {
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<JobWithAssignments | null>(
    null
  );

  useEffect(() => {
    console.log(jobsData);
  }, [jobsData]);

  useEffect(() => {
    const fetchJobsData = async () => {
      const { data, error } = await supabase.from('jobs').select(
        `*, 
        job_assignments (
            employees (
              *
            )
          )`
      );

      if (error) throw error;
      setJobsData(data || []);
    };

    fetchJobsData();
  }, []);

  const handleSeeJobDetails = (jobsId: string) => {
    const job = jobsData.find((jobs) => jobs.id === jobsId);
    setSelectedJobs(job || null);
  };

  return (
    <Table className="overflow-hidden rounded-md">
      <TableHeader>
        <TableRow className="bg-blue-950 hover:!bg-none text-white">
          <TableHead className="text-white font-semibold">No</TableHead>
          {jobsColumn.map((col) => (
            <TableHead key={col.key} className="text-white font-semibold">
              {col.label}
            </TableHead>
          ))}
          <TableHead className="text-white font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {jobsData.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{index + 1}</TableCell>
            {jobsColumn.map((col) => (
              <TableCell key={col.key}>
                {col.key === 'status' ? (
                  <div
                    className={`w-fit py-0.5 px-2 rounded-full text-xs font-semibold ${
                      statusColorMap[row[col.key]] || 'bg-gray-500 text-white'
                    }`}
                  >
                    {row[col.key]}
                  </div>
                ) : (
                  <div>{row[col.key]}</div>
                )}
              </TableCell>
            ))}
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handleSeeJobDetails(row.id)}
                    variant="link"
                    className="p-0"
                  >
                    See Detail
                  </Button>
                </DialogTrigger>

                {selectedJobs && (
                  <DialogContent className="flex flex-col sm:max-w-lg p-2">
                    <DialogHeader className="flex flex-col justify-center items-center ">
                      <DialogTitle>Jobs Detail</DialogTitle>
                      <DialogDescription>
                        Detail dari pekerjaan
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 p-4 text-sm">
                      {Object.entries(selectedJobs)
                        .filter(([key]) => !hiddenAttributes.includes(key))
                        .map(([key, value]) => {
                          const label =
                            attributeLabels[key] || key.replace(/_/g, ' ');

                          const displayValue =
                            value == null || value === '' ? '-' : String(value);

                          return (
                            <React.Fragment key={key}>
                              <p className="font-semibold capitalize text-gray-600">
                                {label}
                              </p>

                              <p className="break-words">: {displayValue}</p>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    {selectedJobs.job_assignments &&
                      Array.isArray(selectedJobs.job_assignments) && (
                        <div className="mt-4 pt-4 border-t">
                          <h3 className="text-md font-semibold mb-3 text-center">
                            Pegawai yang Bertugas
                          </h3>

                          {selectedJobs.job_assignments.length > 0 ? (
                            <div className="flex flex-col gap-2">
                              {selectedJobs.job_assignments.map(
                                (assignment) => (
                                  <Card key={assignment.employees.id}>
                                    <CardContent className="p-3">
                                      <p className="font-medium">
                                        {assignment.employees?.name ||
                                          'Nama tidak tersedia'}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {assignment.employees?.employee_type}
                                      </p>
                                    </CardContent>
                                  </Card>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-center text-sm text-gray-500 italic">
                              Tidak ada petugas yang ditugaskan.
                            </p>
                          )}
                        </div>
                      )}
                  </DialogContent>
                )}
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
