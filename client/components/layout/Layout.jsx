import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Blog App', description = 'A modern blog application' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;