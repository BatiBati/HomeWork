"use client";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#d2e3f6]   bg-">
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>
          <button className="w-full py-2.5 bg-[#8ec5ff] text-white rounded-lg font-medium text-sm transition hover:bg-sky-600 active:scale-95">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
