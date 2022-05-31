import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext/authProvider";
import NotFound from "./pages/notFound";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import ProtectedRoutes from "./protectedRoutes/protectedRoute";
import Home from "./pages/home";
import LandingPage from './pages/landing';
import Abandoned from "./pages/abandoned";
import { createContext,useState} from "react";
import GenerateQr from "./pages/generateQr";
import Scan from "./pages/Scan";
import Activity from "./pages/Activity";
import Dashboard from "./pages/dashboard";
export const ThemeContext=createContext(null);
function App() {
  const [dark,setDark]=useState(false);
  const changeTheme=()=>{
      if(dark){
      document.body.style.backgroundColor = 'white';
    }else{
      document.body.style.backgroundColor = 'black';
    }
    return setDark(!dark)
  }
  return (
    <>
      <BrowserRouter>
      <ThemeContext.Provider value={{dark,changeTheme}}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/Qr" element={<GenerateQr />}/>
              <Route path="/scan" element={<Scan />}/>
              <Route path="/activity" element={<Activity/>}/>
              <Route path="/customer-support" element={<Abandoned/>}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        </ThemeContext.Provider>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
