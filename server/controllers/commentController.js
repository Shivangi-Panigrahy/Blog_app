const { Comment, Post, User } = require("../models");

const createComment = async (req, res) => {
  try {
    const { content, slug } = req.body; // Changed from postId to slug

    if (!content || content.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be at least 3 characters'
      });
    }

    // Find post by slug
    const post = await Post.findOne({ where: { slug } });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      content,
      postId: post.id, // Use the post's ID
      userId: req.user.id,
      status: 'approved'
    });

    // Populate author information
    const newComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the post using the slug
    const post = await Post.findOne({
      where: { slug, status: "published" },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Fetch approved comments for the post
    const comments = await Comment.findAll({
      where: {
        postId: post.id,
        status: "approved",
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Comment content cannot be empty",
      });
    }

    const comment = await Comment.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    comment.content = content || comment.content;
    await comment.save({ status: "approved" });

    res.json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await comment.destroy();

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin functions
const moderateComment = async (req, res) => {
  try {
    const { status } = req.body;

    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    comment.status = status;
    await comment.save({ status: "approved" });

    res.json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
  moderateComment,
};
