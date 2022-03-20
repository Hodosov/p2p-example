const ACTIONS = {
  JOIN: "join",
  LEAVE: "leave",
  SHARE_ROOMS: "share-rooms",
  ADD_PEER: "add-peer", //новое соединение
  REMOVE_PEER: "remove-peer",
  RELAY_SDP: "relay-sdp", //передача данных
  RELAY_ICE: "relay-ice", //передача ice candidate
  ICE_CANDIDATE: "ice-candidate",
  SESSION_DESCRIPTION: "session-description", //новая сессия
};

module.exports = ACTIONS;
