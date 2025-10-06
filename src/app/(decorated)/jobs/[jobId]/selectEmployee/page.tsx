import EmployeeListSelect from '@/app/(decorated)/jobs/[jobId]/selectEmployee/employeeListSelect';
import Header from '@/components/headernav';
import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export default async function selectEmployee({
  params,
}: {
  params: { jobId: string };
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: job, error } = await supabase
    .from('jobs')
    .select('id, status')
    .eq('id', params.jobId)
    .single();

  if (error || !job) {
    notFound();
  }

  if (job.status !== 'DRAFT') {
    redirect(`/jobs/create`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 p-4 gap-4 px-[80px]">
        <EmployeeListSelect />
      </main>
    </div>
  );
}
