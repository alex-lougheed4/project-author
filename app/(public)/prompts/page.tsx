import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: prompts } = await supabase.from("prompts").select();

  return <pre>{JSON.stringify(prompts, null, 2)}</pre>;
}
