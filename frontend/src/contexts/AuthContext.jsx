import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { fakeAuthProvider } from "../auth";
//   import jwt_decode from "jwt-decode";
//   import { login, logout, refreshAccess, verify } from "../api/api";
import axios from "axios";

export const AuthContext = createContext();

function getUserFromStorage() {
  const token = localStorage.getItem("access");
  if (!token) {
    return null;
  }
  try {
    const { name, email } = jwt_decode(token);
    return { name, email };
  } catch (err) {
    localStorage.removeItem("access");
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access")
  );
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const user = getUserFromStorage();
  //   setUser(user);
  // }, [isAuthenticated]);

  //   const loginUser = async (formData) => {
  //     try {
  //       const { access_expires_at, access_token, refresh_expires_at } =
  //         await login(formData);
  //       localStorage.setItem(
  //         "access",
  //         JSON.stringify({ access_token, access_expires_at })
  //       );
  //       localStorage.setItem("refresh", JSON.stringify({ refresh_expires_at }));
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       console.log("error from AuthContext", err);
  //     }
  //   };

  //   const logoutUser = useCallback(async () => {
  //     localStorage.removeItem("access");
  //     localStorage.removeItem("refresh");
  //     setIsAuthenticated(false);
  //     await logout();
  //   }, []);

  //   // Retrieve tokens from localStorage, check their expiration date, and refresh the access token if necessary.
  //   const validatedToken = async () => {
  //     const access = JSON.parse(localStorage.getItem("access"));
  //     const refresh = JSON.parse(localStorage.getItem("refresh"));
  //     if (!access || !refresh) {
  //       throw new Error("no access or refresh token");
  //     }

  //     const { access_expires_at, access_token } = access;
  //     const { refresh_expires_at } = refresh;
  //     if (!access_token || !access_expires_at || !refresh_expires_at) {
  //       throw new Error("no access or refresh token");
  //     }

  //     // The tokens are considered expired if there are less than 10 seconds left before their expiration date
  //     const accessExpired =
  //       Date.now() >= new Date(access_expires_at).getTime() - 10000;
  //     const refreshExpired =
  //       Date.now() >= new Date(refresh_expires_at).getTime() - 10000;

  //     if (refreshExpired) {
  //       throw new Error("refresh token expired");
  //     }

  //     if (accessExpired) {
  //       // Refresh the access token
  //       const { access_expires_at, access_token, refresh_expires_at } =
  //         await refreshAccess();
  //       localStorage.setItem(
  //         "access",
  //         JSON.stringify({ access_token, access_expires_at })
  //       );
  //       localStorage.setItem("refresh", JSON.stringify({ refresh_expires_at }));
  //       setIsAuthenticated(true);
  //       return access_token;
  //     }
  //     return access_token;
  //   };

  //   const verifyAccess = useCallback(async (abortSignal) => {
  //     try {
  //       const access_token = await validatedToken();
  //       const res = await verify({
  //         headers: { Authorization: `Bearer ${access_token}` },
  //         signal: abortSignal,
  //       });
  //       return res.data;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }, []);

  let signin = (staffid, password) => {
    // Perform backend api call to login
    // Assume login successful, data return
    const userData = {
      user: "John Doe",
      role: ["lecturer"],
      // role: ["admin"],
      // role: ["lecturer", "cet_user"],
    };
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        inputs,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:3002/api/auth/logout", null, {
      withCredentials: true,
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      //   value={{ user, isAuthenticated, loginUser, logoutUser, verifyAccess }}
      value={{ user, isAuthenticated, signin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
