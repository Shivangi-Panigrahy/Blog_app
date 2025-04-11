import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../../lib/api';

const CommentForm = ({ slug, onSuccess }) => {
  const [content, setContent] = useState('');
  
  const mutation = useMutation({
    mutationFn: () => api.post('/comments', { content, slug }),
    onSuccess: () => {
      setContent(''); // Clear the form
      onSuccess(); // Refresh comments list
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length >= 3) {
      mutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Write your comment here..."
        required
        minLength={3}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={mutation.isLoading || content.trim().length < 3}
      >
        {mutation.isLoading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;