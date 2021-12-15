import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useContext, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {CategoryContext} from "../../context/CategoryContext";

export default function NewCategoryDialog({open, onClose}){
    const {createCategory} = useContext(CategoryContext);
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try{
            await createCategory(name);
            onClose();
        }catch(e){
            console.error(e);
            setError(e.message ?? e.toString());
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
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
                    {!!error && <div className="error">{error}</div>}
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={submitting}
                        type="submit"
                        className="font-bold"
                        disabled={!name || submitting}
                    >
                        Enregistrer
                    </LoadingButton>
                    <Button className="font-bold" onClick={onClose}>Annuler</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}