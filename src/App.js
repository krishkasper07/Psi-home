import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext/authProvider";
import NotFound from "./pages/notFound";
import SignIn from "./signIn/signIn";
import SignUp from "./signUp/signUp";
import ProtectedRoutes from "./protectedRoutes/protectedRoute";
import Home from "./pages/home";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="home" element={<Home />} />
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
