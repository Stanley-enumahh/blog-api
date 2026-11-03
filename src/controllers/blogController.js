import Blog from "../models/blogModel.js";

// get all blogs

const getAllBlogs = async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      blogs,
      pagination: {
        currentPage: page,
        limit,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (e) {
    res.status(500).json({ message: "error fetching blogs" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "blog with this id does not exist" });
    }

    res.status(200).json({
      data: blog,
    });
  } catch (e) {}
};

const createBlog = async (req, res) => {
  try {
    const { title, summary, imageURL, rating } = req.body;

    const blog = await Blog.create({
      title,
      summary,
      imageURL,
      rating,
    });

    res.status(201).json(blog);
  } catch (e) {
    res.status(500).json({ message: "error creating blogs" });
  }
};

const deleteBlog = async (re, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ message: "blog with this id does not exist" });
    }

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    res.status(500).json({ message: "error deleting blogs" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ message: "blog with this id does not exist" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      data: blog,
    });
  } catch (e) {
    res.status(500).json({ message: "error updating blogs" });
  }
};

const getHighRatedPosts = async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination;

    const blogs = await Blog.find({
      rating: { $gt: 3 },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      blogs,
      pagination: {
        currentPage: page,
        limit,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch high-rated posts",
    });
  }
};

export {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
  getHighRatedPosts,
};
