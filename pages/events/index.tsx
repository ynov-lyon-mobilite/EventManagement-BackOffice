import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";

export default function Events() {
    return (
        <Layout>
            <NextSeo
                title="Evènements"
                description="Gestion des évènements | back-office Yvent"
            />
            events
        </Layout>
    );
}
