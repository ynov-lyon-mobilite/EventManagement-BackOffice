import Layout from "../components/layout/Layout";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import Unauthorized from "../components/error/403";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useContext(UserContext);

  if (!user && !loading) {
    return <Unauthorized />;
  }

  return (
      <Layout>
        <div>welcome</div>
      </Layout>
  );
}
