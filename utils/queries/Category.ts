import {gql} from "@apollo/client";

export const FETCH_CATEGORIES = gql`
    query FetchCategories {
        eventCategories{
            isActive
            name
            uuid
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation CreateNewCategory($name: String!){
        category: createEventCategory(name: $name){
            uuid
            name
            isActive
        }
    }
`;

export const DELETE_CATEGORIES = gql`
    mutation DeleteCategories($uuids: [String!]!){
        deleteEventCategories(uuids: $uuids){
            uuid
        }
    }
`;

export const RESTORE_CATEGORY = gql`
    mutation RestoreCategory($uuid: String!){
        restoreEventCategory(uuid: $uuid){
            uuid
        }
    }
`;