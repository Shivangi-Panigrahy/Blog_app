import Head from 'next/head';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | BlogApp</title>
        <meta name="description" content="Learn more about our blog" />
      </Head>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="prose">
          <p>
            Welcome to BlogApp, your go-to platform for sharing and discovering
            interesting articles on various topics.
          </p>
          <p>
            Our mission is to provide a space where writers can express their
            thoughts and readers can find valuable content.
          </p>
          <h2 className="text-2xl font-bold mt-6">Our Story</h2>
          <p>
            BlogApp was founded in 2023 with the vision of creating a
            user-friendly blogging platform that prioritizes quality content and
            community engagement.
          </p>
          <h2 className="text-2xl font-bold mt-6">Meet the Team</h2>
          <p>
            We're a small team of passionate developers and content creators
            dedicated to making BlogApp the best platform for bloggers.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;