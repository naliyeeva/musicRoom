import { Song } from "@/types";
import { SongCard } from "../SongCard";

interface QueueProps {
  queue: Song[];
  setIsAddSongOpen: (open: boolean) => void;
}

export function Queue({ queue, setIsAddSongOpen }: QueueProps) {
  return (
    <div className="space-y-3">
      {queue.length === 0 ? (
        <div className="rounded border p-6 text-center text-gray-500">
          No songs in queue yet.
          <button
            onClick={() => setIsAddSongOpen(true)}
            className="mt-4 w-full rounded bg-black px-4 py-2 text-white"
          >
            + Add Song
          </button>
        </div>
      ) : (
        queue.map((song) => <SongCard key={song.id} {...song} />)
      )}
    </div>
  );
}
