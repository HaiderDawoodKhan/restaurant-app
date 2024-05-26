import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import {connect} from './utils/db.js'
import { ExamUser } from "./models/user.js";
import { Order } from "./models/order.js";


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

connect()

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  
  socket.on('on-order', (orderId) => {
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined order room ${orderId}`);
  });

  socket.on('status-change', async (id, status) => {
    socket.broadcast.emit('updated-status', id, status)
    const order = await Order.findByIdAndUpdate(id, {status : status})
  })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
  
});
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

 