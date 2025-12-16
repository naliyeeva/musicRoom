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
      <h1 className="text-4xl font-bold text-accent">Music Rooms</h1>
      <Button
        className="mt-4 bg-[#af69ef] hover:bg-[#af69ef]/80 border-none h-auto w-full"
        onClick={() => setIsOpen(true)}
      >
        Create a room
      </Button>
      <Modal open={isOpen} onOpenChange={setIsOpen} title="Create a room">
        <div>
          <Input
            type="text"
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Button type="submit" onClick={handleCreateRoom}>
            {loading ? "Creating..." : "Create room"}
          </Button>
        </div>
      </Modal>
    </main>
  );
}
