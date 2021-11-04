import Layout from "../components/layout/Layout";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Unauthorized from "../components/error/403";
import Link from "next/link";
import {NextSeo} from "next-seo";

export default function Home() {
  const { user, loading } = useContext(UserContext);

  if (!user && !loading) {
    return <Unauthorized />;
  }

  return (
      <Layout>
          <NextSeo
              title="Accueil"
              description="Page d'accueil du back-office Yvent"
          />
          Bienvenue
      </Layout>
  );
}
