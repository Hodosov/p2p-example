import { useCallback, useEffect, useRef } from "react";
import socket from "../socket";
import ACTIONS from "../socket/actions";
import useStateWithCallBack from "./useStateWithCallBack";

export const LOCAL_VIDEO = "LOCAL_VIDEO";

export default function useWebRTC(roomID) {
  const [clients, updateClients] = useStateWithCallBack([]);
  const addNewClient = useCallback(
    (newClien, cb) => {
      if (!clients.includes(newClien)) {
        updateClients((list) => [...list, newClien], cb);
      }
    },
    [clients, updateClients]
  );

  const peerConnections = useRef({});
  const localMediaStreem = useRef(null);
  const peerMediaElements = useRef({
    [LOCAL_VIDEO]: null,
  });

  useEffect(() => {
    async function startCapture() {
      localMediaStreem.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 280,
          height: 280,
        },
      });

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElements = peerMediaElements.current[LOCAL_VIDEO];
        if (localVideoElements) {
          localVideoElements.volume = 0;
          localVideoElements.srcObject = localMediaStreem.current;
        }
      });
    }

    startCapture()
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
      .catch((e) => console.log("error getting userMedia", e));

    return () => {
      localMediaStreem.current.getTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID]);

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  return { clients, provideMediaRef };
}
