"use client";
import { useState } from "react";
import { api } from "../../axios";
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
    <div className="flex h-screen bg-[#d2e3f6]">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-[380px] bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#c3ddfb] flex text-nowrap gap-1">
              Welcome to
              <span className="text-sky-600">Homework Hub</span>
              📖
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Let’s get you signed in
            </p>
          </div>

          <form className="flex flex-col gap-2" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#8ec5ff] text-white rounded-lg font-medium text-sm transition hover:bg-sky-600 active:scale-95"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
