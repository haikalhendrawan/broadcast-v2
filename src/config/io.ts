import { createServer } from "http";
import { Server } from "socket.io";
import app, {server} from "./app.ts"


const io = new Server(server, {});

export default io;
