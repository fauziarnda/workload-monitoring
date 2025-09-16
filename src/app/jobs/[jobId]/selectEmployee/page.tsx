import EmployeeListSelect from '@/app/jobs/[jobId]/selectEmployee/employeeListSelect';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';

export default function selectEmployee() {
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
        <EmployeeListSelect />
      </main>
    </div>
  );
}
