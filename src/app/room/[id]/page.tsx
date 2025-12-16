import { RoomDetails } from "@/components/room/RoomDetails";
import { supabase } from "@/lib/supabase/server";
import { Props } from "@/types";

export default async function RoomPage({ params }: Props) {
  const resolvedParams = await params;

  const { data: songs } = await supabase
    .from("songs")
    .select("*")
    .eq("room_id", resolvedParams.id)
    .order("created_at", { ascending: true });

  return <RoomDetails roomId={resolvedParams.id} songs={songs ?? []} />;
}
