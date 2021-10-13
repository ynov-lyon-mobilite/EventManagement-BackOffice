import Layout from "../components/layout/Layout";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import Login from "./login";

export default function Home() {
    const {user} = useContext(UserContext);

    if(!user){
        return (<Login/>);
    }

    return (
        <Layout>
           welcome
        </Layout>
    )
}
