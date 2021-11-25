import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {
    CreateNewCategoryMutation,
    CreateNewCategoryMutationVariables
} from "../../src/__graphql__/__generated__";
import {LoadingButton} from "@mui/lab";

const CREATE_CATEGORY = gql`
    mutation CreateNewCategory($name: String!){
        category: createEventCategory(name: $name){
            uuid
            name
            isActive
        }
    }
`;

export default function NewCategoryDialog({open, onClose, onNew}){
    const [name, setName] = useState("");
    const [createCategory] = useMutation<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>(CREATE_CATEGORY);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try{
            const { data } = await createCategory({ variables: { name } });
            onNew(data.category);
            onClose();
        }catch(e){
            console.error(e);
            setError(e.message ?? e.toString());
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
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