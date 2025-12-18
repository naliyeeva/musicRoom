import { Song } from "@/types";
import { SongCard } from "../SongCard";
import { Button } from "../ui/button";
import { voteSong } from "@/app/actions/vote-song";
import { useRouter } from "next/navigation";

interface QueueProps {
  queue: Song[];
  setIsAddSongOpen: (open: boolean) => void;
}

export function Queue({ queue, setIsAddSongOpen }: QueueProps) {
  const router = useRouter();

  function getVote(songId: string): "up" | "down" | null {
    const v = sessionStorage.getItem(`vote:${songId}`);
    return v === "up" || v === "down" ? v : null;
  }

  function setVote(songId: string, v: "up" | "down") {
    sessionStorage.setItem(`vote:${songId}`, v);
  }

  async function handleVote(songId: string, type: "up" | "down") {
    const prev = getVote(songId);
    if (prev === type) return; // already voted this way

    await voteSong(songId, type);
    setVote(songId, type);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {queue.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/60 shadow-sm">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `
                radial-gradient(ellipse at top, rgba(168, 85, 247, 0.16), transparent 55%),
                radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.10), transparent 60%)
              `,
            }}
          />
          <div className="relative">
            <p className="text-sm">No songs in queue yet.</p>
            <Button
              onClick={() => setIsAddSongOpen(true)}
              className="mt-4 h-11 w-full bg-[#af69ef] text-white shadow-[0_18px_40px_-18px_rgba(175,105,239,0.75)] hover:bg-[#af69ef]/85"
            >
              + Add Song
            </Button>
          </div>
        </div>
      ) : (
        queue.map((song) => (
          <SongCard key={song.id} {...song} onVote={handleVote} />
        ))
      )}
      <Button
        onClick={() => setIsAddSongOpen(true)}
        className="mt-4 h-11 w-full bg-[#af69ef] text-white shadow-[0_18px_40px_-18px_rgba(175,105,239,0.75)] hover:bg-[#af69ef]/85"
      >
        + Add Song
      </Button>
    </div>
  );
}
