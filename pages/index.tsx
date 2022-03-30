import Layout from "../components/layout/Layout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Unauthorized from "../components/error/403";
import {NextSeo} from "next-seo";
import {Fab} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventIcon from '@mui/icons-material/Event';
import {useRouter} from "next/router";
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Home() {
  const { user, loading } = useContext(UserContext);

  if (!user && !loading) {
    return <Unauthorized />;
  }

  return (
      <Layout fullHeight={true}>
          <NextSeo
              title="Accueil"
              description="Page d'accueil du back-office Yvent"
          />
          <div className="d-flex flex-1">
              <div className="d-flex flex-wrap justify-around w-full m-auto">
                  <HomeLink link="/profile" url="security.jpg" alt="security-image">Profil</HomeLink>
                  <HomeLink link="/categories" url="categories.webp" alt="categories-image">Catégories</HomeLink>
                  <HomeLink link="/events" url="events.webp" alt="events-image">Evènements</HomeLink>
              </div>
          </div>
      </Layout>
  );
}

function HomeLink ({url, link, children, alt = "link-image"}){
    const router = useRouter();
    return (
        <div className="home-link-container" onClick={() => {router.push(link)}}>
            <img className="home-link-image" src={url} alt={alt} style={{
                objectFit: 'cover'
            }}/>
            <div className="home-link-text-container">
                <div className="m-auto home-link-text">{children ?? 'Lien'}</div>
            </div>
        </div>
    );
}
