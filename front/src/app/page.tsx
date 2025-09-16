"use client"
import { useEffect, useState } from "react";
import { api } from "../../axios";

export default function Home() {

  const [data, setData] = useState("")
  const handleSubmit = async () => {
    await api.post("/user", { email: data })
  }


  return (
    <div className="flex flex-col items-center relative">
      <input className="bg-red-500" onChange={(e) => setData(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
