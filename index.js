const express = require("express");
const app = express();
const pool = require("./sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");

const PORT = process.env.PORT || 5000;

function authenticateToken(req,res, next){
  // get meta information for request
  const authHeader = req.headers.authorization;
  console.log({auth: req.headers.authorization});

  // store the token in variable
  const token = authHeader && authHeader.split(" ")[1];
  console.log({token});

  // what if no token
  if(!token) return res.sendStatus(401);

  jwt.verify(token, 'tacos', (err, user)=>{
    if(err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user);
    next();
  });
}

app.use(express.json());
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/users", authenticateToken, userRoutes);  
app.use("/todos", authenticateToken, todosRoutes);


app.get("/", (req,res)=>{
  res.json({
      message: "welcome to our server!",
  });
});

   
app.listen(PORT, () => console.log(`I'm listening on port ${PORT}`))