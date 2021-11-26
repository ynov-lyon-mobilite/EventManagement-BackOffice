import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {useContext, useState} from "react";
import CategoriesTable from "../../components/categories/CategoriesTable";
import NewCategoryDialog from "../../components/categories/NewCategoryDialog";
import _ from 'lodash';
import {CategoryContext} from "../../context/CategoryContext";

export default function Categories() {
    const { categories, loading } = useContext(CategoryContext);
    const [openCreationDialog, setOpenCreationDialog] = useState(false);

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
                    <CategoriesTable
                        categories={_.sortBy(categories, (cat) => !cat.isActive)}
                        onCreation={handleCreationIconCLick}
                    />
                    {openCreationDialog && (<NewCategoryDialog open={true} onClose={handleCloseCreationDialog}/>)}
                </>
            )}
        </Layout>
    );
}
