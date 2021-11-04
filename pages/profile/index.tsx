import Layout from "../../components/layout/Layout";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {NextSeo} from "next-seo";

export default function Profile() {
    const {user} = useContext(UserContext);
    return (
        <Layout>
            <NextSeo
                title="Profil"
                description="Profil utilisateur | back-office Yvent"
            />
            profil de : {user.displayName}
        </Layout>
    );
}
