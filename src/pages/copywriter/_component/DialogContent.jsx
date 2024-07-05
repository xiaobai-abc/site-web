import { cn } from "@/shadcn-ui/libs/utils";
import { Dialog, DialogContent } from "@/shadcn-ui/ui/dialog-loose";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

function DialogContentComponent({ children, className, ...props }, ref) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("dialogContent render");
  }, []);

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    }
  }));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(className)}>{children}</DialogContent>
    </Dialog>
  );
}

export default forwardRef(DialogContentComponent);
