import { login, register, getMe, logOut } from "../service/auth.api";
import { AuthContext } from "../auth.context.jsx";
import { useContext } from "react";
import { useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data?.user);
    setLoading(false);
  };

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data?.user);
    // console.log(data)
    setLoading(false);
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data?.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    const data = await logOut();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogOut,
    handleLogin,
    handleGetMe,
  };
};
