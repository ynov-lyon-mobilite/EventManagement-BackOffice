import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import {LoadingButton} from "@mui/lab";
import {Button, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function PasswordForm({ showAlert = (text: string) => {} }){
    const {updatePassword} = useContext(UserContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword !== newPasswordConfirm) {
            setError('La confirmation est inexacte');
            return;
        }
        setSubmitting(true);
        setError(null);
        try{
            await updatePassword(newPassword, oldPassword);
            handleReset();
            showAlert("Changement du mot de passe effectué");
        }catch(e){
            console.error(e);
            setError(e.message ?? e.toString());
        }
        setSubmitting(false);
    }

    const handleReset = () => {
        setNewPassword("");
        setOldPassword("");
        setNewPasswordConfirm("");
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const areFieldFilled = !!newPassword || !!oldPassword || !!newPasswordConfirm;

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
                <Button onClick={handleClickShowPassword} startIcon={showPassword ? <VisibilityOff /> : <Visibility />}>
                    {showPassword ? 'Cacher' : 'Afficher'} les mots de passe
                </Button>
            </div>
            <div>
                <FormControl sx={{ width: '25ch' }} variant="outlined" margin="normal">
                    <InputLabel htmlFor="oldpassword">Ancien mot de passe</InputLabel>
                    <OutlinedInput
                        required
                        id="oldpassword"
                        type={showPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => {setOldPassword(e.target.value)}}
                        label="Password"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ width: '25ch' }} variant="outlined" margin="normal">
                    <InputLabel htmlFor="newpassword">Nouveau mot de passe</InputLabel>
                    <OutlinedInput
                        required
                        id="newpassword"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {setNewPassword(e.target.value)}}
                        label="Password"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ width: '25ch' }} variant="outlined" margin="normal">
                    <InputLabel htmlFor="confirm-newpassword">Confirmez le mot de passe</InputLabel>
                    <OutlinedInput
                        required
                        id="confirm-newpassword"
                        type={showPassword ? 'text' : 'password'}
                        value={newPasswordConfirm}
                        onChange={(e) => {setNewPasswordConfirm(e.target.value)}}
                        label="Password"
                    />
                </FormControl>
            </div>
            {error && <div className="mt-2 error">{error}</div>}
            <div className="mt-2">
                <LoadingButton
                    loading={submitting}
                    type="submit"
                    variant="contained"
                    className="font-bold"
                    disabled={!newPassword}
                >Enregistrer</LoadingButton>
                {areFieldFilled && <Button className="font-bold ml-2" onClick={handleReset}>Annuler</Button>}
            </div>
        </form>
    );
}