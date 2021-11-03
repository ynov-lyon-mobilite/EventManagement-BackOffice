import Layout from "../../components/layout/Layout";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export default function Profile() {
    const {user} = useContext(UserContext);
    return <Layout>profil de : {user.displayName}</Layout>;
}
