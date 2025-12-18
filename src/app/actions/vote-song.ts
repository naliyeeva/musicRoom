"use server";

import { supabase } from "@/lib/supabase/server";

type VoteType = "up" | "down";

export async function voteSong(songId: string, type: VoteType) {
  const increment = type === "up" ? 1 : -1;

  const { error } = await supabase.rpc("increment_votes", {
    song_id: songId,
    increment_value: increment,
  });

  if (error) {
    throw new Error(error.message);
  }
}
