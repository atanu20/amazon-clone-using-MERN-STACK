const PORT = process.env.PORT || 7000

const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
  
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendUpdate", ({  receiverid, receiverorderid }) => {
    const user = getUser(receiverid);
    console.log(receiverid,receiverorderid)

    if (user) {

      io.to(user.socketId).emit("getUpdate", {
        receiverid,
        receiverorderid
        
      });
    }
  });


 







  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


 
