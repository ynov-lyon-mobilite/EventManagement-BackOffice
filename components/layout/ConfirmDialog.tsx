import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function ConfirmDialog({open, title, children, onConfirm = () => {}, onDismiss = () => {}, onClose}){

    const handleConfirm = () => {
        if(onConfirm) onConfirm();
        onClose();
    }
    const handleDismiss = () => {
        if(onDismiss) onDismiss();
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
                <Button variant="outlined" onClick={handleDismiss} autoFocus>Dismiss</Button>
            </DialogActions>
        </Dialog>
    );
}