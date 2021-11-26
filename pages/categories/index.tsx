import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {gql, useMutation, useQuery} from "@apollo/client";
import {
    DeleteCategoriesMutation, DeleteCategoriesMutationVariables,
    FetchCategoriesQuery, RestoreCategoryMutation, RestoreCategoryMutationVariables
} from "../../src/__graphql__/__generated__";
import {useEffect, useState} from "react";
import CategoriesTable from "../../components/categories/CategoriesTable";
import NewCategoryDialog from "../../components/categories/NewCategoryDialog";
import _ from 'lodash';

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

const RESTORE_CATEGORY = gql`
    mutation RestoreCategory($uuid: String!){
        restoreEventCategory(uuid: $uuid){
            uuid
        }
    }
`;

export default function Categories() {
    const { data, loading } = useQuery<FetchCategoriesQuery>(FETCH_CATEGORIES);
    const [deleteCategories] = useMutation<DeleteCategoriesMutation, DeleteCategoriesMutationVariables>(DELETE_CATEGORIES);
    const [restoreCategory] = useMutation<RestoreCategoryMutation, RestoreCategoryMutationVariables>(RESTORE_CATEGORY);
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
        await deleteCategories({variables : { uuids }});
        setCategories(prev => prev.map(cat => {
            if(uuids.includes(cat.uuid)){
                return {...cat, isActive: false};
            }
            return cat;
        }))
    }

    const handleRestore = async (category) => {
        await restoreCategory({variables: {uuid: category.uuid}});
        setCategories(prev => prev.map(cat => {
            if(cat.uuid === category.uuid){
                return {...category, isActive: true};
            }
            return cat;
        }))
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
                        onDeletion={handleDelete}
                        onRestore={handleRestore}
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
