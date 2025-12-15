type Props = {
  title: string;
  artist: string;
  votes: number;
};

export function SongCard({ title, artist, votes }: Props) {
  return (
    <div className="flex items-center justify-between rounded border p-4">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{artist}</p>
      </div>

      <div className="flex items-center gap-2">
        <span>{votes}</span>
        <button className="rounded bg-gray-100 px-2">👍</button>
      </div>
    </div>
  );
}
