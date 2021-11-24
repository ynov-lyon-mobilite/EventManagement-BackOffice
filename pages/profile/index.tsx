import Layout from "../../components/layout/Layout";
import {ReactNode, SyntheticEvent, useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import {NextSeo} from "next-seo";
import {Alert, Box, Collapse, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GeneralProfileForm from "../../components/profile/GeneralProfileForm";
import CloseIcon from '@mui/icons-material/Close';
import ProgressLinear from "../../components/progress/ProgressLinear";
import PasswordForm from "../../components/profile/PasswordForm";

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`,
    };
}

export default function Profile() {
    const {user} = useContext(UserContext);
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
                <TabPanel value={value} index={0}>
                    <GeneralProfileForm showAlert={showAlert}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
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

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
