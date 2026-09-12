import { createClient } from "@@/lib/supabase/server";
import AboutClient from "./AboutClient";

export const revalidate = 60;

export default async function AboutPage() {
  const supabase = await createClient();

  const { data: pageContent, error } = await supabase
    .from("page_content")
    .select("id, content")
    .in("id", ["mission", "vision", "history"]);

  if (error) {
    console.error("Failed to load page_content:", error.message);
  }

  // Turn the rows into a simple { mission: "...", vision: "...", history: "..." } map
  const content = Object.fromEntries(
    (pageContent ?? []).map((row) => [row.id, row.content]),
  );

  return <AboutClient content={content} />;
}
