import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 } from "uuid";
import socket from "../socket";
import ACTIONS from "../socket/actions";

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);

  useEffect(() => {
    //показываем все комнаты
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      updateRooms(rooms);
    });
  }, []);

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map((roomID) => (
          <li key={roomID}>
            {roomID}
            <button
              onClick={() => {
                history.push(`/rooms/${roomID}`);
              }}
            >
              JOIN ROOM
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          history.push(`/rooms/${v4()}`);
        }}
      >
        Create New Room
      </button>
    </div>
  );
}
