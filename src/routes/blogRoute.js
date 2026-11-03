import express from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blogController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router.get("/", pagination, getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.patch("/:id", updateBlog);

export default router;
