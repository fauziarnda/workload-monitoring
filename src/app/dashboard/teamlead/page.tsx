import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/headernav';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

export default function TeamLeadDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 ">
      <Header className=" " />

      <main className="flex flex-col flex-1 p-4 gap-4 px-[80px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Hello Team Leader</h1>
            <p className="text-base text-neutral-400">
              lorem ipsum dolor sit amet
            </p>
          </div>

          <Button size="lg" className="bg-blue-950">
            <Link
              href="/jobs/create"
              className="flex items-center gap-2 h-full"
            >
              <Plus />
              Create new job
            </Link>
          </Button>
        </div>

        <div className="flex flex-row gap-4">
          <Card className="w-full h-32 relative overflow-hidden">
            <div className="absolute top-0 left-64 w-[100%] h-[100%] bg-blue-950 -rotate-45"></div>
            <CardContent className=" flex flex-col px-5 py-4 ">
              <h3 className="text-2xl font-bold">23</h3>
              <p>Total Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden">
            <div className="absolute top-0 left-64 w-[100%] h-[100%] bg-blue-950 -rotate-45"></div>
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-2xl font-bold">23</h3>
              <p>On Going Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden">
            <div className="absolute top-0 left-64 w-[100%] h-[100%] bg-blue-950 -rotate-45"></div>
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-2xl font-bold">23</h3>
              <p>Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* table list */}

        <Card className="flex flex-col flex-1 overflow-y-auto">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-2xl font-bold">Job List</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
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
          </CardHeader>
          <CardContent className="py-0">
            <div className="rounded-md overflow-hidden">
              <table className="w-full text-sm rounded-md">
                <thead className="bg-blue-950 text-white">
                  <tr>
                    <th className="border-b px-4 py-2 text-left">#</th>
                    <th className="border-b px-4 py-2 text-left">Job Name</th>
                    <th className="border-b px-4 py-2 text-left">Status</th>
                    <th className="border-b px-4 py-2 text-left">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b px-4 py-2">1</td>
                    <td className="border-b px-4 py-2">Design Homepage</td>
                    <td className="border-b px-4 py-2">In Progress</td>
                    <td className="border-b px-4 py-2">15 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                  <tr>
                    <td className="border-b px-4 py-2">2</td>
                    <td className="border-b px-4 py-2">Fix Bug API</td>
                    <td className="border-b px-4 py-2">Completed</td>
                    <td className="border-b px-4 py-2">10 Sept 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
