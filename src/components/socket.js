import openSocket from "socket.io-client";

export const socket = openSocket("http://localhost:7000");

export default socket;
