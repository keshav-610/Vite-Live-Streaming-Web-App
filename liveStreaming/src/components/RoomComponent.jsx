import { useParams } from "react-router-dom";
import LiveStream from "./LiveStream";

const RoomComponent = () => {
  const { roomID } = useParams(); 
  return (
    <div>
      <LiveStream roomID={roomID}/>
    </div>
  );
};

export default RoomComponent;
