import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

const users = [
  {
    id: 1,
    username: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'securepassword',
  },
  {
    id: 3,
    firstName: 'Peter',
    lastName: 'Jones',
    email: 'peter.jones@example.com',
    password: 'anotherpassword',
  },
];

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex justify-between border-b items-center py-4 px-[80px] bg-white',
        className
      )}
    >
      <div className="flex flex-row gap-2">
        <Avatar className="w-[32px] h-[32px] rounded-full ">
          <AvatarImage src="#" alt="avatar" />
          <AvatarFallback className="bg-blue-950 text-white font-bold "></AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-blue-950">LOGO</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-base p-2 text-neutral-400">
          Today, 09 September 2025{' '}
        </p>
        <div className="flex gap-3 items-center rounded-none pl-4 border-l-2 shadow-none cursor-pointer ">
          <Avatar className="w-[32px] h-[32px] rounded-full ">
            <AvatarImage src="#" alt="avatar" />
            <AvatarFallback className="bg-blue-950 text-white ">
              TS
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="truncate font-medium text-base ">
              {users[0].username}
            </p>
          </div>
          <ChevronDown className="" />
        </div>
      </div>
    </header>
  );
}
