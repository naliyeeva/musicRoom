import Modal from "./general/Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSongModal({ open, onOpenChange }: Props) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div>
        <h2>Add Song</h2>
        <Input type="text" placeholder="Song name" />
        <Button type="submit">Add</Button>
      </div>
    </Modal>
  );
}
