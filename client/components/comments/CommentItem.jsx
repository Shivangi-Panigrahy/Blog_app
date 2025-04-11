import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const CommentItem = ({ comment }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Mutation for deleting comment
  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/comments/${comment.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", comment.postId]);
    },
  });

  // Format date to be more readable
  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">
            {comment.author.username}
          </span>
          {comment.status === "pending" && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
              Pending Approval
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      
      <p className="text-gray-700 mb-2">{comment.content}</p>
      
      {/* Show delete button only for comment author or admin */}
      {(user?.id === comment.userId || user?.role === "admin") && (
        <div className="flex justify-end">
          <button
            onClick={() => deleteMutation.mutate()}
            className="text-xs text-red-500 hover:text-red-700"
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;