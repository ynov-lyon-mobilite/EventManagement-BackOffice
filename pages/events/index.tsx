import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";
import {useContext} from "react";
import {EventContext} from "../../context/EventContext";

export default function Events() {
    const {events, loading} = useContext(EventContext);

    return (
        <Layout>
            <NextSeo
                title="Evènements"
                description="Gestion des évènements | back-office Yvent"
            />
            {loading ? "Chargement..." : (
                <div>{JSON.stringify(events)}</div>
            )}
        </Layout>
    );
}
