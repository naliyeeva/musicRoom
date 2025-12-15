"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/general/Modal";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/server";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/actions/create-room";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const getRooms = async () => {
  //   const { data } = await supabase.from("rooms").select("*");
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getRooms();
  // }, []);

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

  // const createRoom = () => {
  //   console.log("Creating room", roomName);
  //   setIsOpen(false);
  //   setRoomName("");
  // };

  return (
    <main>
      <h1 className="text-4xl font-bold">Music Rooms</h1>
      <Button
        variant="secondary"
        className="mt-4"
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
