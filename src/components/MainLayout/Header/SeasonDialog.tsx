import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface ISeasonDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const SeasonDialog = ({ open, onOpenChange }: ISeasonDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>header</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SeasonDialog;
