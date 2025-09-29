import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { data: employees } = await supabase.from('employees').select('*');
  console.log(employees);

  return (
    <div className="flex justify-center place-items-center">
      <Button>Hello World</Button>
    </div>
  );
}
