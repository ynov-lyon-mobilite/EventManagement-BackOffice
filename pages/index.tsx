import Layout from "../components/layout/Layout";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {useRouter} from "next/router";
import Unauthorized from "../components/error/403";

export default function Home() {
    const {user, fetching} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        /*if(!user && !fetching){
            router.push({pathname: '/login'});
        }*/
    }, [user]);

    if(!user && !fetching){
        return <Unauthorized/>
    }

    return (
        <Layout>
           welcome
        </Layout>
    )
}
