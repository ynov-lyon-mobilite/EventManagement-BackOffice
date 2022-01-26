import Layout from "../../components/layout/Layout";
import {SyntheticEvent, useEffect, useState} from "react";
import {NextSeo} from "next-seo";
import {Alert, Box, Collapse, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GeneralProfileForm from "../../components/profile/GeneralProfileForm";
import CloseIcon from '@mui/icons-material/Close';
import ProgressLinear from "../../components/progress/ProgressLinear";
import PasswordForm from "../../components/profile/PasswordForm";
import {a11yProps} from "../../utils/other";
import TabPanel from "../../components/layout/TabPanel";

export default function Profile() {
    const [value, setValue] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("Opération effectuée");
    const alertTimeOut = 3000;

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const showAlert = (text?: string) => {
        if(!!text){
            setAlertText(text);
        }
        setOpenAlert(true);
    };

    useEffect(() => {
        if(!!openAlert){
            setTimeout(() => {setOpenAlert(false)}, alertTimeOut+500)
        }
    },[openAlert])

    return (
        <Layout>
            <NextSeo
                title="Profil"
                description="Profil utilisateur | back-office Yvent"
            />
            <Typography variant="h3" className="text-center">Profil</Typography>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
                        <Tab icon={<ManageAccountsIcon />} iconPosition="start" label="Général" {...a11yProps(0)} />
                        <Tab icon={<VpnKeyIcon />} iconPosition="start" label="Mot de passe" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} id="profile" index={0}>
                    <GeneralProfileForm showAlert={showAlert}/>
                </TabPanel>
                <TabPanel value={value} id="profile" index={1}>
                    <PasswordForm showAlert={showAlert}/>
                </TabPanel>
            </Box>
            <Collapse in={openAlert}>
                {openAlert && <ProgressLinear timeout={alertTimeOut}/>}
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {setOpenAlert(false);}}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {alertText}
                </Alert>
            </Collapse>
        </Layout>
    );
}
