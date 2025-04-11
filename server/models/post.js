const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(500),
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft',
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
  }, {
    hooks: {
      beforeValidate: (post) => {
        if (post.title) {
          post.slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }
        if (post.content && !post.excerpt) {
          post.excerpt = post.content.substring(0, 200) + '...';
        }
      },
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
    });
  };

  return Post;
};