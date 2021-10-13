import Layout from "../components/layout/Layout";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext";
import Login from "./login";
import {useRouter} from "next/router";

export default function Home() {
    const {user, fetching} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(!user && !fetching){
            router.push({pathname: '/login'});
        }
    }, [user])

    return (
        <Layout>
           welcome
        </Layout>
    )
}
