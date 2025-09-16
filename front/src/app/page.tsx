"use client";
import { useRouter } from "next/navigation";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const rounter = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/teacher/login", { email, password });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      alert("Logged in successfully!");
      rounter.push("/teacher");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };


 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 text-center">
        🏫 <span className="text-blue-500 mr-4">Homework Hub</span>
        тавтай морил! ✨
      </h1>

      <p className="text-gray-500 mb-10">
        Ямар хэрэглэгчээр нэвтрэхээ сонгоно уу.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full mt-15">
        <div
          className="p-6 rounded-2xl hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-100"
          onClick={() => router.push("/teacher-login")}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🍎 Багшаар нэвтрэх
          </h2>
          <div className="w-full h-60 bg-white rounded-xl flex items-center justify-center text-6xl ">
            <img
              src="https://res.cloudinary.com/dqd01lbfy/image/upload/v1758032813/teacher_lzeiwn.jpg"
              className="w-full h-full rounded-xl "
            ></img>
          </div>
        </div>

        <div className="p-6 rounded-2xl hover:shadow-lg transition cursor-pointer bg-gradient-to-br from-blue-50 to-green-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🎒 Сурагчаар нэвтрэх
          </h2>
          <div className="w-full h-60 bg-white rounded-xl flex items-center justify-center text-6xl">
            <img
              src="https://res.cloudinary.com/dqd01lbfy/image/upload/v1758032870/student_aexihm.jpg"
              className="w-full h-full rounded-xl "
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
