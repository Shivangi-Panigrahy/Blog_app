import Head from 'next/head';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | BlogApp</title>
        <meta name="description" content="Get in touch with us" />
      </Head>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="prose">
          <p>
            We'd love to hear from you! Whether you have a question about
            features, need help, or want to give feedback, please reach out to
            us.
          </p>
          <h2 className="text-2xl font-bold mt-6">Contact Information</h2>
          <ul>
            <li>Email: contact@blogapp.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Blog Street, San Francisco, CA 94107</li>
          </ul>
          <h2 className="text-2xl font-bold mt-6">Send Us a Message</h2>
          <form className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;