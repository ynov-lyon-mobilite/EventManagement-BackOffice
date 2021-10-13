import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export default function Login(){
    const {setUser} = useContext(UserContext);

    return (
        <div>
            login
        </div>
    );
}