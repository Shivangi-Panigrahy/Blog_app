import Head from 'next/head';
import PostsList from '../components/posts/PostsList';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlogApp - Home</title>
        <meta name="description" content="Welcome to BlogApp" />
      </Head>
      <PostsList />
    </>
  );
}