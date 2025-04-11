import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import { useAuth } from "../../hooks/useAuth";

const CommentsList = ({ slug }) => {
  const { user } = useAuth();
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["comments", slug],
    queryFn: async () => {
      const { data } = await api.get(`/comments/post/${slug}`);
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      {/* Only show form if user is logged in */}
      {user && <CommentForm slug={slug} onSuccess={refetch} />}

      {/* Comments list */}
      <div className="space-y-4">
        {data?.data?.length > 0 ? (
          data.data.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">
            {user 
              ? "No comments yet. Be the first to comment!" 
              : "Please login to comment"
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;