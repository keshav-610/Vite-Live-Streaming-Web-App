import { Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home";
import RoomPage from "./pages/room/[roomID]/RoomPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomID" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
