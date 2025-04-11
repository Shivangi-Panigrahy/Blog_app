import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfileData = async () => {
      try {
        const { data } = await api.get(`/auth/me`);
        setProfileData(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">User Information</h2>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Username:</span> {profileData.username}</p>
              <p><span className="font-medium">Email:</span> {profileData.email}</p>
              <p><span className="font-medium">Role:</span> {profileData.role}</p>
              <p><span className="font-medium">Member Since:</span> {new Date(profileData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;