import { RoomDetails } from "@/components/room/RoomDetails";
import { Props } from "@/types";

export default async function RoomPage({ params }: Props) {
  const resolvedParams = await params;
  return <RoomDetails roomId={resolvedParams.id} />;
}
