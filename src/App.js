import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext/authProvider";
import NotFound from "./pages/notFound";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import ProtectedRoutes from "./protectedRoutes/protectedRoute";
import Home from "./pages/home";
import NavBar from "./navbar/navbar";
import LandingPage from './pages/landing';
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
