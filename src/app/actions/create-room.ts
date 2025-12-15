import { supabase } from "@/lib/supabase/server";

export async function createRoom(name: string) {
  if (!name) {
    throw new Error("Room name is required");
  }

  const { data, error } = await supabase
    .from("rooms")
    .insert({ name })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create room");
  }

  return data; // { id, name, created_at }
}
