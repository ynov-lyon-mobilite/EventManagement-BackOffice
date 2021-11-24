import Layout from "../components/layout/Layout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Unauthorized from "../components/error/403";
import {NextSeo} from "next-seo";
import {Fab} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventIcon from '@mui/icons-material/Event';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {useRouter} from "next/router";

export default function Home() {
  const { user, loading } = useContext(UserContext);
    const router = useRouter();

  if (!user && !loading) {
    return <Unauthorized />;
  }

  return (
      <Layout>
          <NextSeo
              title="Accueil"
              description="Page d'accueil du back-office Yvent"
          />
          <div className="d-flex">
              <div className="m-auto d-flex justify-around w-full flex-wrap">
                  <Fab variant="extended" className="m-2 font-bold" onClick={() => {router.push('/profile')}}>
                      <ManageAccountsIcon sx={{ mr: 1 }} />
                      Mon profil
                  </Fab>
                  <Fab variant="extended" className="m-2 font-bold" onClick={() => {router.push('/events')}}>
                      <EventIcon sx={{ mr: 1 }} />
                      Evènements
                  </Fab>
                  <Fab variant="extended" className="m-2 font-bold" onClick={() => {router.push('/bookings')}}>
                      <BookmarkAddIcon sx={{ mr: 1 }} />
                      Réservations
                  </Fab>
              </div>
          </div>
      </Layout>
  );
}
