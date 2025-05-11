import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uuid = user?.id;
  console.log("UUID", uuid);
  const { data: profileData, error: userError } = await supabase
    .from("profiles")
    .select()
    .single();

  if (userError || !user) {
    console.log(userError);
    redirect("/login");
  }
  const { email } = profileData;

  return (
    <>
      <p>Hello {user.email}</p>
      {JSON.stringify(profileData)}
      <p>Hello {email ?? "No email found"}</p>
    </>
  );
}
