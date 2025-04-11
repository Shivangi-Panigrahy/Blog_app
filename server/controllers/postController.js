const { Post, User, Comment } = require('../models');
const { Op } = require('sequelize');

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || '';
    const status = req.query.status || 'published';

    const where = {
      status,
    };

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: posts } = await Post.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
      ],
      order: [['publishedAt', 'DESC']],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: posts,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug, status: 'published' },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          as: 'comments',
          where: { status: 'approved' },
          required: false,
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'username'],
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const post = await Post.create({
      title,
      content,
      status,
      userId: req.user.id,
      publishedAt: status === 'published' ? new Date() : null,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const post = await Post.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;

    if (status === 'published' && post.status !== 'published') {
      post.publishedAt = new Date();
    }

    await post.save();

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    await post.destroy();

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};