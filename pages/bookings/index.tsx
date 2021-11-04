import Layout from "../../components/layout/Layout";
import {NextSeo} from "next-seo";

export default function Bookings() {
    return (
        <Layout>
            <NextSeo
                title="Réservations"
                description="Gestion des réservations | back-office Yvent"
            />
            bookings
        </Layout>
    );
}
