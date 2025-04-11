// /Users/shivangipraptipanigrahy/Documents/blog-app/client/components/posts/PostItem.jsx
import { useRouter } from "next/router";
import { usePost } from "../../hooks/usePosts";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import CommentsList from "../comments/CommentsList";
import { useAuth } from "../../hooks/useAuth";

const PostItem = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useAuth();

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = usePost(slug);

  if (!slug || isPostLoading) return <LoadingSpinner />;
  if (isPostError) return <ErrorMessage message={postError.message} />;

  return (
    <div className="space-y-8">
      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {new Date(postData.data.publishedAt).toLocaleDateString()}
          </span>
          <span className="text-sm text-blue-600">
            {postData.data.author.username}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{postData.data.title}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.data.content }}
        />
      </article>

      {/* Comments Section - Only pass user and slug to CommentsList */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <CommentsList slug={slug} />
      </section>
    </div>
  );
};

export default PostItem;