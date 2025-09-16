import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TeamLeadDashboard() {
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

      <main className="flex flex-col flex-1 p-4 gap-4">
        <div className="flex justify-between items-center ">
          <Card className="w-full">
            <CardContent className="flex flex-row justify-between px-6 py-4 items-center">
              <div className="border-r-2 pr-6">
                <h3 className="text-lg font-bold ">September</h3>
                <p className="text-sm">Today, 09 September 2025 </p>
              </div>
              <Button size="lg" className="">
                <Plus />
                <Link href="/jobs/create">Create new job</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-row gap-4">
          <Card className="w-full h-32">
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-2xl font-bold ">23</h3>
              <p>Total Job</p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-2xl font-bold ">23</h3>
              <p>On Going Job</p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-2xl font-bold ">23</h3>
              <p>Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* table list */}

        <Card className="flex flex-col flex-1 overflow-y-auto">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-bold">Job List</h3>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Job Name</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Design Homepage</td>
                  <td className="border px-4 py-2">In Progress</td>
                  <td className="border px-4 py-2">15 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Fix Bug API</td>
                  <td className="border px-4 py-2">Completed</td>
                  <td className="border px-4 py-2">10 Sept 2025</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
