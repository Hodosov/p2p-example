import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import socket from "../socket";
import ACTIONS from "../socket/actions";

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    //показываем все комнаты
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
    <div ref={rootNode}>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                history.push(`/room/${roomID}`);
              }}
            >
              JOIN ROOM
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          history.push(`/room/${v4()}`);
        }}
      >
        Create New Room
      </button>
    </div>
  );
}
