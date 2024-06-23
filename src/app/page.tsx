"use client";
import { usePrompts } from "./firebase/usePrompts";

export default function Home() {
  const { GetPrompts } = usePrompts();
  const prompts = GetPrompts();
  console.log(`prompts: ${prompts}`);
  return (
    <>
      <main>Home</main>
      <p>{JSON.stringify(prompts)}</p>
    </>
  );
}
