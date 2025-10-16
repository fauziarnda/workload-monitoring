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
import { useEffect, useState } from 'react';
import JobsTable from './jobsTable';

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
            <CardContent className=" flex flex-col px-5 py-4 ">
              <h3 className="text-4xl font-bold">23</h3>
              <p>Total Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden border-none ">
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-4xl font-bold">23</h3>
              <p>On Going Job</p>
            </CardContent>
          </Card>

          <Card className="w-full h-32 relative overflow-hidden border-none">
            <CardContent className="flex flex-col px-5 py-4">
              <h3 className="text-4xl font-bold">23</h3>
              <p>Completed</p>
            </CardContent>
          </Card>
        </div>

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
                    Filter by status
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
            <JobsTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
