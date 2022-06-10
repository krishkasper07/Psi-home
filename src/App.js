import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext/authProvider";
import NotFound from "./pages/notFound";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import ProtectedRoutes from "./protectedRoutes/protectedRoute";
import Home from "./pages/home";
import LandingPage from './pages/landing';
import Abandoned from "./pages/customerService/abandoned";
import { createContext,useEffect,useState} from "react";
import GenerateQr from "./pages/generateQr";
import Scan from "./pages/Scan";
import Activity from "./pages/Activity";
import Dashboard from "./pages/DashBoard/dashboard";
import axios from "axios";
export const ThemeContext=createContext(null);
export const orderContext=createContext(null)
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

  const abandonedUrl = process.env.REACT_APP_ABANDONED_URL;

  const shopifyUrl=process.env.REACT_APP_SHOPIFY_URL;

  const dashUrl=process.env.REACT_APP_DASHORDERS;

  const ActivityUrl=process.env.REACT_APP_SCAN;

  const [abandonedOrders, setAbandonedOrders] = useState([]);

  const [allOrders,setAllOrders]=useState([]);

  const[dashOrders,setDashOrders]=useState([]);

  const [activity,setActivity]=useState([]);

  const getAbandoned = async () => {
    let response = await axios.get(abandonedUrl);
    setAbandonedOrders(response.data);
  };

  const getShopifyOrders=async()=>{
    let response = await axios.get(shopifyUrl);
    setAllOrders(response.data);
  }

  const getDashOrders=async()=>{
    let response = await axios.get(dashUrl);
    setDashOrders(response.data);
  }

  const getActivity=async()=>{
    let response = await axios.get(ActivityUrl);
    setActivity(response.data);
  }

  useEffect(()=>{
    getDashOrders();
    getAbandoned();
    getShopifyOrders();
    getActivity();
  },[])

  

  let contextData={
    abandonedOrders:abandonedOrders,
    homeOrders:allOrders,
    dashOrders:dashOrders,
    scannedOrders:activity,
    getDashOrders:getDashOrders
  }
  return (
    <>
      <BrowserRouter>
      <ThemeContext.Provider value={{dark,changeTheme}}>
        <orderContext.Provider value={contextData}>
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
        </orderContext.Provider>
        </ThemeContext.Provider>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
