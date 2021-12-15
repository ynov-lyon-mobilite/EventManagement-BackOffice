import {createContext, useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {
    CreateNewCategoryMutation, CreateNewCategoryMutationVariables,
    DeleteCategoriesMutation,
    DeleteCategoriesMutationVariables,
    FetchCategoriesQuery, RestoreCategoryMutation, RestoreCategoryMutationVariables
} from "../src/__graphql__/__generated__";

type CategoryContextType = {
    categories : FetchCategoriesQuery["eventCategories"] | null,
    activeCategories : FetchCategoriesQuery["eventCategories"] | null,
    loading : boolean,
    createCategory: (category) => Promise<void>,
    deleteCategoriesFromId: (uuids: Array<string>) => Promise<void>,
    restoreCategory: (uuid: string) => Promise<void>,
}

const FETCH_CATEGORIES = gql`
    query FetchCategories {
        eventCategories{
            isActive
            name
            uuid
        }
    }
`;

const CREATE_CATEGORY = gql`
    mutation CreateNewCategory($name: String!){
        category: createEventCategory(name: $name){
            uuid
            name
            isActive
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

export const CategoryContext = createContext<CategoryContextType>(undefined);

export default function CategoryContextProvider({children}){
    const { data, loading } = useQuery<FetchCategoriesQuery>(FETCH_CATEGORIES);
    const [deleteCategories] = useMutation<DeleteCategoriesMutation, DeleteCategoriesMutationVariables>(DELETE_CATEGORIES);
    const [restoreCategory] = useMutation<RestoreCategoryMutation, RestoreCategoryMutationVariables>(RESTORE_CATEGORY);
    const [createCategory] = useMutation<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>(CREATE_CATEGORY);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if(data){
            setCategories(data.eventCategories ?? []);
        }
    },[data])

    const handleCreateCategory = async (name) => {
        const { data } = await createCategory({ variables: { name } });
        setCategories(prev => [...prev, data.category]);
    };

    const deleteCategoriesFromId = async (uuids) => {
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

    const activeCategories = categories.filter(category => category.isActive);

    return (
        <CategoryContext.Provider value={{
            categories,
            activeCategories,
            loading,
            createCategory: handleCreateCategory,
            deleteCategoriesFromId,
            restoreCategory: handleRestore
        }}>
            {children}
        </CategoryContext.Provider>
    );
}