import { createServer } from "http";
import { Server } from "socket.io";
import app, {server} from "./app"


const io = new Server(server, {});

export default io;
