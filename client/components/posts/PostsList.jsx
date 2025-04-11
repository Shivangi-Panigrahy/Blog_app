import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

const PostsList = () => {
  const { user, loading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [userPostsMode, setUserPostsMode] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const { data, isLoading, isError, error, refetch } = usePosts(
    page, 
    10, 
    search,
    userPostsMode ? user?.id : undefined
  );

  // Handle initial load and auth state changes
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        setUserPostsMode(true);
        refetch();
      }
      setInitialLoad(false);
    }
  }, [authLoading, user, refetch]);

  if (authLoading || initialLoad) return <LoadingSpinner />;
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  const showEmptyState = data.data.length === 0 && !initialLoad;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {userPostsMode ? "Your Posts" : "Latest Posts"}
        </h1>
        <div className="flex space-x-4">
          <SearchInput value={search} onChange={setSearch} />
          {user && (
            <button
              onClick={() => setUserPostsMode(!userPostsMode)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {userPostsMode ? "Show All Posts" : "Show Your Posts"}
            </button>
          )}
        </div>
      </div>

      {showEmptyState ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            {userPostsMode
              ? "You haven't created any posts yet."
              : "No posts to show."}
          </p>
          {!user && (
            <p className="text-gray-600">
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Login
              </Link> to create your first post!
            </p>
          )}
          {user && (
            <Link
              href="/posts/create"
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Your First Post
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default PostsList;