import React from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

export const socket = io(`${window.location.protocol.replace("http", "ws")}//${window.location.host}/`);
export const SocketContext = React.createContext<Socket>({} as Socket);
