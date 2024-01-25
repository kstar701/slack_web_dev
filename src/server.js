import express from "express";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import http from "http"; // 웹 소켓이기때문에 http를 통해서 이루어져야함
import socketIo from "socket.io";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import moment from "moment";
import { localsMiddleware } from "./middlewares";
import router from "./routers/Router";

const PORT = 3000;
const app = express();
const logger = morgan("dev");

const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  session({
    secret: "thisismysecretdonttellanyone!",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://kkm:4214@localhost:27017",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/", router);
const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:ss A"),
    });
  });
});

server.listen(PORT, handleListening);
// app.listen(PORT, handleListening);
export default app;
