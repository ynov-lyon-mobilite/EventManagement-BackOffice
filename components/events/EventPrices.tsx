import {TextField} from "@mui/material";
import {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {LoadingButton} from "@mui/lab";

export default function EventPrices({event}){
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleNewPrice = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            {event.prices.map(price => (<div key={price.uuid}>{price.amount}</div>))}
            <form onSubmit={handleNewPrice} className="d-flex">
                <TextField
                    label="Montant"
                    required
                    type="number"
                    sx={{mr: 2}}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <TextField
                    label="Description"
                    required
                    sx={{mr: 2}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="my-auto">
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitting}
                        loadingPosition="start"
                        startIcon={<AddIcon/>}
                        disabled={!amount || !description || submitting}
                    >Ajouter</LoadingButton>
                </div>
            </form>
        </div>
    );
}