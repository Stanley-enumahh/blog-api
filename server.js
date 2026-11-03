import app from "./src/app.js";
import ConnectDB from "./src/config/mongoDB.js";
import blogRoute from "./src/routes/blogRoute.js";

ConnectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Places Blog API is running",
  });
});

app.use("/api/blogs/", blogRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
