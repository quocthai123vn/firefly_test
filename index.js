const express = require("express");
const { PORT_DEFAULT } = require("./constants/app.constant");
const userRouter = require("./apis/user.api");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/user", userRouter);

app.listen(PORT_DEFAULT, () => {
  console.log(`App is running at http://localhost:${PORT_DEFAULT}`);
});
