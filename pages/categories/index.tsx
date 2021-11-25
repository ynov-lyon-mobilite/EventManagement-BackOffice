import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {gql, useQuery} from "@apollo/client";
import {FetchCategoriesQuery} from "../../src/__graphql__/__generated__";
import {
    Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import CategoriesTable from "../../components/categories/CategoriesTable";
import NewCategoryDialog from "../../components/categories/NewCategoryDialog";

const FETCH_CATEGORIES = gql`
    query FetchCategories {
        eventCategories{
            isActive
            name
            uuid
        }
    }
`;

export default function Categories() {
    const { data, loading } = useQuery<FetchCategoriesQuery>(FETCH_CATEGORIES);
    const [categories, setCategories] = useState([]);
    const [openCreationDialog, setOpenCreationDialog] = useState(false);

    useEffect(() => {
        if(data){
            setCategories(data.eventCategories ?? []);
        }
    },[data])

    const handleCreationIconCLick = () => {
        setOpenCreationDialog(true);
    };

    const handleCloseCreationDialog = () => {
        setOpenCreationDialog(false);
    };

    return (
        <Layout>
            <NextSeo
                title="Catégories"
                description="Gestion des catégories | back-office Yvent"
            />
            {loading ? (
                <>chargement...</>
            ) : (
                <>
                    <CategoriesTable categories={categories} onCreation={handleCreationIconCLick}/>
                    {openCreationDialog && <NewCategoryDialog open={true} onClose={handleCloseCreationDialog}/>}
                </>
            )}
        </Layout>
    );
}
