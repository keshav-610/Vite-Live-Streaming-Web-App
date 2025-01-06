import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomComponent from "../../../components/RoomComponent";

const RoomPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { roomID } = useParams();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  return (
    <div>
      {isClient && <RoomComponent roomID={roomID} />}
    </div>
  );
};

export default RoomPage;
