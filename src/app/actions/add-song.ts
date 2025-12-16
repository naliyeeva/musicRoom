"use server";

import { supabase } from "@/lib/supabase/server";

type AddSongParams = {
  roomId: string;
  title: string;
  artist?: string;
};

export async function addSong({ roomId, title, artist }: AddSongParams) {
  const { data, error } = await supabase
    .from("songs")
    .insert({
      room_id: roomId,
      title,
      artist,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
