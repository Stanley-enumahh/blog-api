import app from "./src/app.js";
import ConnectDB from "./src/config/mongoDB.js";
import blogRoute from "./src/routes/blogRoute.js";
import bcrypt from "bcrypt";

ConnectDB();

const password = "12345";

const hashedPassword = await bcrypt.hash(password, 12);

console.log(hashedPassword);

const loginPassword = "1234";

const isVerified = await bcrypt.compare(password, loginPassword);

// GET /api/profile
// Authoization:Bearer <access-token>

console.log(isVerified);

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
