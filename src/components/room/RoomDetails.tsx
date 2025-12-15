"use client";
import { AddSongModal } from "../AddSongModal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/server";
import { Song } from "@/types";
import { Queue } from "./Queue";

interface RoomDetailsProps {
  roomId: string;
}

interface Room {
  id: string;
  name: string;
}

export function RoomDetails({ roomId }: RoomDetailsProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);

  const mockQueue: Song[] = [];
  const sortedQueue: Song[] = mockQueue.sort((a, b) => b.votes - a.votes);

  useEffect(() => {
    async function fetchRoom() {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      setRoom(data);
      setLoading(false);
    }

    fetchRoom();
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{room.name}</h1>
      <p className="text-gray-500">Room ID: {room.id}</p>
      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Queue</h2>
        <Queue queue={sortedQueue} setIsAddSongOpen={setIsAddSongOpen} />
      </section>
      <AddSongModal open={isAddSongOpen} onOpenChange={setIsAddSongOpen} />
    </main>
  );
}
