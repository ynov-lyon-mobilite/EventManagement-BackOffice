import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
import {LoadingButton} from "@mui/lab";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function PasswordForm({ showAlert = (text: string) => {} }){
    const {updatePassword} = useContext(UserContext);
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try{
            await updatePassword(newPassword);
            setNewPassword("");
            showAlert("Changement du mot de passe effectué");
        }catch(e){
            console.error(e);
            setError(e.message ?? e.toString());
        }
        setSubmitting(false);
    }

    const handleReset = () => {
        setNewPassword("");
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Nouveau mot de passe</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {setNewPassword(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
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
                {!!newPassword && <Button className="font-bold ml-2" onClick={handleReset}>Annuler</Button>}
            </div>
        </form>
    );
}