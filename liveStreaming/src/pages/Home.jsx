import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid"; 
import Footer from "../components/Footer";

const Home = () => {
  const { fullName, setFullName } = useUser();
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFullName("");
  }, [setFullName]);

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <div className="flex items-center justify-center flex-grow flex-col gap-6">
        <div>
          <h1 className="font-bold text-6xl font-sans text-white tracking-tight">
            Have a Live Stream
          </h1>
        </div>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-transparent text-white border rounded-lg border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 w-80 shadow-md transition-all placeholder-gray-400 text-base"
            autoComplete="off"
          />
        </div>
        <div className="gap-2 flex items-center justify-center flex-col">
          {fullName && fullName.length >= 3 && (
            <>
              <input
                type="text"
                id="roomID"
                placeholder="Enter Room ID"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
                className="bg-transparent text-white border rounded-lg border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 w-80 shadow-md transition-all placeholder-gray-400 text-base"
                autoComplete="off"
              />
              <button
                onClick={() => {navigate(`/room/${roomID}?role=Audience`);}}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-indigo-700 transition-all font-bold cursor-pointer"
                disabled={!roomID}
              >
                Join
              </button>
              <button 
                className="text-indigo-500 font-bold"
                onClick={() => navigate(`/room/${uuid()}?role=Host`)} // Default to Host when starting a new stream
              >
                Or Start a new live Stream
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
