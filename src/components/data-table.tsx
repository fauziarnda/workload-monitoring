'use client';

import React, { useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';

export type Column<T> = {
  key: keyof T;
  label: string;
};

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const allIds = data.map((d) => d.id);
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const allSelected = selectedCount === allIds.length && allIds.length > 0;

  function toggleOne(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll() {
    if (allSelected) {
      setSelected({});
    } else {
      const nxt: Record<string, boolean> = {};
      allIds.forEach((id) => (nxt[id] = true));
      setSelected(nxt);
    }
  }
  return (
    <div className="overflow-hidden rounded-md border">
      {/* employee terpilih */}
      <div className="flex items-center gap-2">
        <div className="text-sm">{selectedCount} terpilih</div>
        <Button variant="outline" size="sm" onClick={() => setSelected({})}>
          Clear
        </Button>
      </div>
      {/* datatabel */}
      <Table className="">
        <TableHeader>
          <TableRow className="bg-neutral-500 hover:!bg-none text-white">
            <TableHead className="w-12">
              <Checkbox
                aria-label="Pilih semua baris"
                checked={allSelected}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            {columns.map((col) => (
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
          {data.map((row) => {
            const isSelected = !!selected[row.id];
            return (
              <TableRow
                key={row.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  isSelected ? 'bg-muted/70' : ''
                }`}
                onClick={() => toggleOne(row.id)}
                role="row"
                aria-selected={isSelected}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleOne(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Pilih ${row.id}`}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {String(row[col.key])}
                  </TableCell>
                ))}

                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // biar tidak trigger row click
                        }}
                        variant="link"
                        className="p-0"
                      >
                        See Detail
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="flex flex-col sm:max-w-lg items-center justify-center text-center">
                      <DialogHeader className="flex flex-col justify-center text-center">
                        <DialogTitle>Personal Informastion</DialogTitle>
                        <DialogDescription>
                          Detail dari employee
                        </DialogDescription>
                      </DialogHeader>

                      <Avatar className="w-24 h-24 rounded-md border">
                        <AvatarImage src="#" alt="name" />
                        <AvatarFallback className="rounded-md">
                          A
                        </AvatarFallback>
                      </Avatar>

                      <div className="mt-2 space-y-2">
                        <p>Nama Pegawai : Lorem Ipsum Dolor</p>
                        <p>Daerah Asal : Malang</p>
                        <p>Pengalaman Kerja</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
