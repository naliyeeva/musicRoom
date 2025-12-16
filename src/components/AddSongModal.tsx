import Modal from "./general/Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { addSong } from "@/app/actions/add-song";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
}

export function AddSongModal({ open, onOpenChange, roomId }: Props) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const router = useRouter();

  async function handleAdd() {
    if (!title.trim()) return;

    await addSong({
      roomId,
      title,
      artist,
    });

    setTitle("");
    setArtist("");
    onOpenChange(false);
    router.refresh();
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="text-white">Add song</span>}
      description={
        <span className="text-white/60">Add a track to the room queue.</span>
      }
      contentClassName="overflow-hidden border border-white/10 bg-[#0b0613]/95 p-0 text-white shadow-2xl sm:rounded-2xl"
      headerClassName="px-6 pt-6 pb-0 text-left"
    >
      <div className="relative px-6 pb-6 pt-4">
        <div className="relative flex flex-col gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Song name
            </label>
            <Input
              type="text"
              placeholder="e.g. The Less I Know The Better"
              className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/40 shadow-sm focus-visible:ring-[#af69ef]/40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Artist</label>
            <Input
              type="text"
              placeholder="e.g. Tame Impala"
              className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/40 shadow-sm focus-visible:ring-[#af69ef]/40"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            onClick={handleAdd}
            className="mt-1 h-11 w-full bg-[#af69ef] text-white shadow-[0_18px_40px_-18px_rgba(175,105,239,0.75)] hover:bg-[#af69ef]/85"
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}
