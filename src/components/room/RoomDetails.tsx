"use client";
import { AddSongModal } from "../AddSongModal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/server";
import { Song } from "@/types";
import { Queue } from "./Queue";

interface RoomDetailsProps {
  roomId: string;
  songs: Song[];
}

interface Room {
  id: string;
  name: string;
}

export function RoomDetails({ roomId, songs }: RoomDetailsProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddSongOpen, setIsAddSongOpen] = useState(false);

  const sortedQueue: Song[] = songs.sort((a, b) => b.votes - a.votes);

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
    <main className="relative min-h-screen px-6 py-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(168, 85, 247, 0.22), transparent 45%),
            radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.14), transparent 60%)
          `,
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">{room.name}</h1>
          <p className="mt-1 text-sm text-white/55">Room ID: {room.id}</p>
        </header>

        <section className="mt-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold text-white">Queue</h2>
            <p className="text-xs text-white/50">Vote songs to move them up</p>
          </div>
          <Queue queue={sortedQueue} setIsAddSongOpen={setIsAddSongOpen} />
        </section>
        <AddSongModal
          roomId={roomId}
          open={isAddSongOpen}
          onOpenChange={setIsAddSongOpen}
        />
      </div>
    </main>
  );
}
