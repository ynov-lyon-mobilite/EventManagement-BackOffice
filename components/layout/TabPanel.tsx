import {ReactNode} from "react";
import {Box, Typography} from "@mui/material";

interface TabPanelProps {
    children?: ReactNode;
    id: string;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, id, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${id}-tabpanel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
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