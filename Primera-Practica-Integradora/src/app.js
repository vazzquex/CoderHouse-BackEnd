import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import messagesModel from "./dao/models/message.model.js";
import viewsRouter from "./routes/views.router.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const run = (socketServer, app) => {
  app.use((req, res, next) => {
    req.io = socketServer;
    next();
  });

  app.use("/products", viewsRouter);

  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/chat", chatRouter);

  socketServer.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", async (data) => {
      await messagesModel.create(data);
      let messages = await messagesModel.find().lean().exec();
      socketServer.emit("logs", messages);
    });
  });

  app.use("/", viewsRouter);
};


const uri =
  ''

mongoose.set("strictQuery", false);
mongoose.connect(
  uri,
  {
    dbName: "ecommerce",
  },
);


const httpServer = app.listen(port, () =>
  console.log(`Escuchando por el puerto: ${port}`)
);
const socketServer = new Server(httpServer);
httpServer.on("error", (err) => console.log("ERROR: " + err));

run(socketServer, app);
