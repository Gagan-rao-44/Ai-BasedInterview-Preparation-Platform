import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // GET PROFILE
  const getProfile = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

    } catch (error) {

      console.log(error);

      localStorage.removeItem("token");

    }

    setLoading(false);

  };

  useEffect(() => {
    getProfile();
  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;