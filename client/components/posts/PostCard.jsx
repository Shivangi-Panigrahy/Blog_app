import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
          <span className="text-sm text-blue-600">{post.author.username}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link
          href={`/posts/${post.slug}`}
          className="text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;