import EmployeeListSelect from '@/app/jobs/[jobId]/selectEmployee/employeeListSelect';
import Header from '@/components/headernav';
export default function selectEmployee() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 p-4 gap-4 px-[80px]">
        <EmployeeListSelect />
      </main>
    </div>
  );
}
