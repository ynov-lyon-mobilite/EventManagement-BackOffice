import {gql} from "@apollo/client";

export const FETCH_USER = gql`
    query FetchCurrentUser {
        user_infos {
            displayName
            email
            uuid
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($password: String!, $email: String!) {
        loggedUser: login(password: $password, email: $email) {
            user {
                displayName
                email
                joinedEvents {
                    title
                }
                roles
                uuid
            }
            jwt
        }
    }
`;

export const UPDATE_MAIN_USER = gql`
    mutation updateMainUser($displayName: String, $email: String, $uuid: String!){
        updateUser(displayName: $displayName, email: $email uuid: $uuid){
            uuid
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($newPassword: String!, $oldPassword: String!){
        changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
    }
`;