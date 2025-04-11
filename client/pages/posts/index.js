import { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import PostCard from '../../components/posts/PostCard';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Head from 'next/head';

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, error } = usePosts(page, 10, search);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Head>
        <title>Posts | BlogApp</title>
        <meta name="description" content="Browse all blog posts" />
      </Head>
      
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Posts</h1>
          <SearchInput value={search} onChange={setSearch} />
        </div>

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
      </div>
    </>
  );
};

export default PostsPage;