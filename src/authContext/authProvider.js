import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { ThemeContext } from "../App";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const { dark } = useContext(ThemeContext);

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (e.target.department.value==='Select Department'){
       return toast('Select Your Department',{
        icon: "😡",
        style:dark?{
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }:{},
      })
    }
    const data = {
      name: e.target.name.value,
      userName: e.target.userName.value,
      password: e.target.password.value,
      department:e.target.department.value
    };
    axios
      .post("http://localhost:5001/api/signUp", data)
      .then((res) => {
        toast(res.data.message, {
          icon: "👏",
          style:dark?{
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          }:{},
        });
        navigate("/signIn");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const data = {
      userName: e.target.userName.value,
      password: e.target.password.value,
    };
    axios
      .post("http://localhost:5001/api/login", data)
      .then((res) => {
        toast(res.data.message, {
          icon: "🥳",
          style: dark?{
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          }:{},
        });
        setAuthToken(res.data);
        setUser(jwt_decode(res.data.accessToken));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        navigate("home");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const logOutUser = async () => {
    let data = localStorage.getItem("authTokens");
    let newData = {refreshToken: JSON.parse(data).refreshToken};
 
      axios
      .post("http://localhost:5001/api/refreshToken/delete", newData)
      .then((res) => toast(res.data.message, {
        icon: "😞",
        style: dark?{
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }:{},
      }))
      .catch((err) => console.log(err));
    
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const updateToken = async () => {
    const data = {
      refreshToken: authToken?.refreshToken,
    };

    if (data !== undefined) {
      await axios
        .post("http://localhost:5001/api/refreshToken", data)
        .then((res) => {
          setAuthToken(res.data);
          setUser(jwt_decode(res.data.refreshToken));
          localStorage.setItem("authTokens", JSON.stringify(res.data));
        })
        .catch((err) => {
          logOutUser();
          localStorage.removeItem("authTokens");
          console.log("user logged out", err);
        });
    }

    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      updateToken();
    }
    let timer = 1000*60*14;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, timer);
    return () => clearInterval(interval);
  }, [authToken, isLoading]);

  let contextData = {
    user:user,
    isLoading: isLoading,
    signUp: signUp,
    signIn: signIn,
    logOutUser: logOutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
