'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Header from '@/components/headernav';
import { FaPlus } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import * as React from 'react';
import { useState } from 'react';

export default function TeamLeadDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);

  const filterOption = ['SUSENAS', 'SAKERNAS', 'VHTL', 'KEPKA'];

  return (
    <div className="flex flex-col relative min-h-screen ">
      <Header />

      <main className="flex flex-col flex-1 pt-4 pb-8 gap-4 px-[80px]">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
              Team Leader
            </h1>
            <p className="text-base text-neutral-200">
              lorem ipsum dolor sit amet
            </p>
          </div>
          <div>
            <Button size="lg" className=" bg-brand-primary">
              <Link
                href="/jobs/create"
                className="flex items-center gap-2 text-white"
              >
                <FaPlus />
                Create new job
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Card className="w-full h-32 relative overflow-hidden border-none">
            <div className="absolute w-[8%] h-[80%] bg-brand-secondary right-4 bottom-0 rounded-t-full"></div>
            <div className="absolute w-[8%] h-[50%] bg-brand-primary right-4 bottom-0 rounded-t-full -translate-x-14"></div>

            <CardContent className=" flex flex-col px-5 py-4 ">
              <h3 className="text-4xl font-bold">23</h3>
              <p>Total Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden border-none ">
            <div className="absolute w-[8%] h-[80%] bg-brand-secondary right-4 bottom-0 rounded-t-full"></div>
            <div className="absolute w-[8%] h-[50%] bg-brand-primary right-4 bottom-0 rounded-t-full -translate-x-14"></div>
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-4xl font-bold">23</h3>
              <p>On Going Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden border-none">
            <div className="absolute w-[8%] h-[80%] bg-brand-secondary right-4 bottom-0 rounded-t-full"></div>
            <div className="absolute w-[8%] h-[50%] bg-brand-primary right-4 bottom-0 rounded-t-full -translate-x-14"></div>
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-4xl font-bold">23</h3>
              <p>Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* table list */}

        <Card className="flex flex-col flex-1 overflow-y-auto">
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-2xl font-bold leading-normal">
                Daftar Pekerjaan
              </h3>

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
                  <Button variant="outline">
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
                      className="w-full bg-brand-primary"
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
            </div>
          </CardHeader>

          <CardContent className="py-0">
            <div className="rounded-md overflow-hidden">
              <table className="w-full text-sm rounded-md">
                <thead className="bg-brand-primary text-white">
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
