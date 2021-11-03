import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export default function Header() {
    const {logout} = useContext(UserContext);
  return (
    <>
      <Link href="/">Accueil</Link>
        <div onClick={logout}>Deconnexion</div>
    </>
  );
}
