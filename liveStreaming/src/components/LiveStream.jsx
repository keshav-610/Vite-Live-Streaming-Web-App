import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import useUser from '../hooks/useUser';

const LiveStream = ({ roomID }) => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const roleStr = searchParams.get("role") || "Host";  // Default role to Host if not provided
    const fullName = useUser();

    const role = {
        Host: ZegoUIKitPrebuilt.Host,
        Cohost: ZegoUIKitPrebuilt.Cohost,
        Audience: ZegoUIKitPrebuilt.Audience
    }[roleStr];

    const currentURL = window.location.origin + location.pathname + location.search;
    const sharedLinks = [
        ...(role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost ? [{
            name: "Join as Co-Host",
            url: `${currentURL}&role=Cohost`
        }] : []),
        {
            name: "Join as Audience",
            url: `${currentURL}&role=Audience`
        }
    ];

    const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        uuid(),
        `${fullName}user${Date.now()}`,
        720
    );

    const myMeeting = (element) => {
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: { role }, // Make sure role is passed correctly
            },
            sharedLinks,
        });
    };

    return (
        <div className="w-full h-screen" ref={myMeeting}></div>
    );
};

export default LiveStream;
