type Props = {
  title: string;
  artist: string;
  votes: number;
};

export function SongCard({ title, artist, votes }: Props) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-sm backdrop-blur">
      <div>
        <p className="font-medium leading-tight">{title}</p>
        <p className="text-sm text-white/55">{artist}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="min-w-6 text-right text-sm text-white/80">
          {votes}
        </span>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#af69ef]/50">
          👍
        </button>
      </div>
    </div>
  );
}
