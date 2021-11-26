import {useRouter} from "next/router";
import Layout from "../../../components/layout/Layout";

export default function Event(){
    const router = useRouter();
    return (
        <Layout>{router.query.id}</Layout>
    );
}