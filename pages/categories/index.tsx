import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {gql, useMutation, useQuery} from "@apollo/client";
import {
    DeleteCategoriesMutation, DeleteCategoriesMutationVariables,
    FetchCategoriesQuery
} from "../../src/__graphql__/__generated__";
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

const DELETE_CATEGORIES = gql`
    mutation DeleteCategories($uuids: [String!]!){
        deleteEventCategories(uuids: $uuids){
            uuid
        }
    }
`;

export default function Categories() {
    const { data, loading } = useQuery<FetchCategoriesQuery>(FETCH_CATEGORIES);
    const [deleteCategories] = useMutation<DeleteCategoriesMutation, DeleteCategoriesMutationVariables>(DELETE_CATEGORIES);
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

    const handleNewCategory = (category) => {
        setCategories(prev => [...prev, category]);
    };

    const handleDelete = async (uuids) => {
        console.log(uuids);
        await deleteCategories({variables : { uuids }});
        setCategories(prev => prev.map(cat => {
            if(uuids.includes(cat.uuid)){
                return {...cat, isActive: false};
            }
            return cat;
        }))
    }

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
                        categories={categories}
                        onCreation={handleCreationIconCLick}
                        onDeletion={handleDelete}
                    />
                    {openCreationDialog && (
                        <NewCategoryDialog
                            open={true}
                            onClose={handleCloseCreationDialog}
                            onNew={handleNewCategory}
                        />
                    )}
                </>
            )}
        </Layout>
    );
}
