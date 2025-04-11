import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [localUser, setLocalUser] = useState(null);

  // Sync auth state with localStorage
  useEffect(() => {
    setIsMounted(true);
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (token && userData) {
        setLocalUser(JSON.parse(userData));
      } else {
        setLocalUser(null);
      }
    };

    // Check immediately
    handleStorageChange();

    // Listen for changes
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Also listen to route changes (for client-side navigations)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setLocalUser(JSON.parse(userData));
    } else {
      setLocalUser(null);
    }
  }, [router.pathname]);

  const currentUser = user || localUser;

  console.log(currentUser, "currentUser");

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          BlogApp
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>

          {isMounted && !loading ? (
            <>
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={{
                      pathname: "/profile",
                      query: { id: currentUser.id },
                    }}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Profile
                  </Link>
                  <span className="text-gray-600">{currentUser.username}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
