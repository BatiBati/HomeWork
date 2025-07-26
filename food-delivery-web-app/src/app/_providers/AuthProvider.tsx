import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { api, setAuthToken } from "../../../axios";

type User = {
  _id: string;
  email: string;
  phoneNumber: number;
  address: string;
  role: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-in`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      if (data.user?.role === "ADMIN") {
        router.push("/AdminPage/foodMenu");
      } else if (data.user?.role === undefined) {
        router.push("/");
      }
      toast.success("Account created.");
    } catch (error) {
      console.error("Failed to sign in", error);
      toast.error("Failed to sign in");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-up`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      console.log(data);
    } catch (error) {
      console.error("Failed to sign in", error);
      toast.error("Failed to sign up");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const { data } = await api.get(`/auth/me`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, signUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
