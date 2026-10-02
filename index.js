const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {connectToMongoDB} = require('./connect');
const {restrictToLoggedinUserOnly, checkAuth} = require("./middleware/auth")
const URL = require("./models/url");


const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB Connected"))
.catch((err) =>console.error("MongoDB Connection Error :", err));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now()
      }
    }
  })

  res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});