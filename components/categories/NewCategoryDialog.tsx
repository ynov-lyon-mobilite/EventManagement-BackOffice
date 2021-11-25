import {
    Button,
    Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    TextField
} from "@mui/material";
import {useState} from "react";

export default function NewCategoryDialog({open, onClose}){
    const [name, setName] = useState("");

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Nouvelle Catégorie</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    id="name"
                    label="Nom"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <FormGroup className="mt-2">
                    <FormControlLabel control={<Checkbox checked={true} />} label="Active" />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button className="font-bold" onClick={onClose}>Annuler</Button>
                <Button className="font-bold" onClick={onClose}>Enregistrer</Button>
            </DialogActions>
        </Dialog>
    );
}