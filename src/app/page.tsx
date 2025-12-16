"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/actions/create-room";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      const room = await createRoom(roomName);
      router.push(`/room/${room.id}`);
      console.log("Room created", room);
    } catch (err) {
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-8 mx-auto w-screen h-screen max-w-2xl flex flex-col items-center justify-center">
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
      radial-gradient(
        ellipse at center,
        rgba(168, 85, 247, 0.2),
        transparent 40%
      ),
      radial-gradient(
        rgba(236, 72, 153, 0.15),
        transparent 60%
      )
    `,
          }}
        />

        <div className="relative z-10 flex min-h-[20vh] items-center justify-center">
          <h1 className="text-center text-5xl font-bold text-white">
            Music Rooms
          </h1>
        </div>
      </section>

      <Button
        className="mt-4 bg-[#af69ef] hover:bg-[#af69ef]/80 border-none h-10 w-full text-md cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Create a room
      </Button>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title={<span className="text-white">Create a room</span>}
        description={
          <span className="text-white/60">
            Pick a name and invite friends to queue songs.
          </span>
        }
        contentClassName="overflow-hidden border border-white/10 bg-[#0b0613]/95 p-0 text-white shadow-2xl sm:rounded-2xl"
        headerClassName="px-6 pt-6 pb-0 text-left"
      >
        <div className="relative px-6 pb-6 pt-4">
          <div className="relative flex flex-col gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Room name
              </label>
              <Input
                type="text"
                placeholder="e.g. Late night vibes"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/40 shadow-sm focus-visible:ring-[#af69ef]/40"
              />
            </div>

            <Button
              type="submit"
              onClick={handleCreateRoom}
              className="mt-1 h-11 w-full bg-[#af69ef] text-white shadow-[0_18px_40px_-18px_rgba(175,105,239,0.75)] hover:bg-[#af69ef]/85"
            >
              {loading ? "Creating..." : "Create room"}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
