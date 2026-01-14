import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ToggleUserDialog({
  open,
  newState,
  userName,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {newState ? "Activate User" : "Deactivate User"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to{" "}
          <strong>{newState ? "activate" : "deactivate"}</strong> {userName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={newState ? "primary" : "error"}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
