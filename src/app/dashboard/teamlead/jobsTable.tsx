import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPortal,
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
import { useEffect, useState } from 'react';

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

export default function JobsTable() {
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [selectedJobs, setSelectedJobs] = useState(false);

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

  const handleSeeJobDetails = () => {
    setSelectedJobs(true);
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
                    onClick={handleSeeJobDetails}
                    variant="link"
                    className="p-0"
                  >
                    See Detail
                  </Button>
                </DialogTrigger>

                {selectedJobs && (
                  <DialogContent className="flex flex-col sm:max-w-lg p-2">
                    <DialogHeader className="flex flex-col justify-center items-center ">
                      <DialogTitle>Personal Informastion</DialogTitle>
                      <DialogDescription>
                        Detail dari employee
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 p-4 ">
                      <div className="mt-2 space-y-2">
                        <p>hello world</p>
                      </div>
                    </div>
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
