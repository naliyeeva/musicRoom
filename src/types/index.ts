export type Props = {
    params: Promise<{ id: string }>;
};

export interface Song {
  id: string;
  title: string;
  artist: string;
  votes: number;
  created_at: string;
}