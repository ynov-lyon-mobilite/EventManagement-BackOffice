import {Button, InputAdornment, TextField} from "@mui/material";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import _ from 'lodash';
import {LoadingButton} from "@mui/lab";

export default function GeneralProfileForm() {
    const {user} = useContext(UserContext);
    const initialUserState = {
        username: user.username,
        email: user.email,
        displayName: user.displayName,
    };
    const [newProfile, setNewProfile] = useState(initialUserState);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newProfile);
        setSubmitting(true);
    };

    const handleReset = (e) => {
        setNewProfile(initialUserState);
    }

    const isSameObject = _.isMatch(user, newProfile);

    return(
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-wrap">
                <TextField
                    required
                    id="outlined-basic"
                    className="my-1 mr-2"
                    label="Nom complet"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={newProfile.displayName}
                    onChange={(e) => {setNewProfile(prev => ({...prev, displayName: e.target.value}))}}
                />
                <TextField
                    required
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    className="my-1 mr-2"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={newProfile.email}
                    onChange={(e) => {setNewProfile(prev => ({...prev, email: e.target.value}))}}
                />
                <TextField
                    required
                    id="outlined-basic"
                    label="Nom d'utilisateur"
                    variant="outlined"
                    className="my-1"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={newProfile.username}
                    onChange={(e) => {setNewProfile(prev => ({...prev, username: e.target.value}))}}
                />
            </div>
            <div className="mt-2">
                <LoadingButton
                    loading={submitting}
                    type="submit"
                    variant="contained"
                    className="font-bold"
                    disabled={isSameObject}
                >Enregistrer</LoadingButton>

                {!isSameObject && <Button className="font-bold ml-2" onClick={handleReset}>Annuler</Button>}
            </div>
        </form>
    );
}