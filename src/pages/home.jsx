import { useContext } from "react";
import AuthContext from "../authContext/authProvider";

const Home=()=>{
    const {logOutUser}=useContext(AuthContext)
    return <div>
        welcome Home
        <button onClick={logOutUser}>Log out</button>
    </div>
}

export default Home;