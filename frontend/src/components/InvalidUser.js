import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InvalidUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-4xl text-gray-600 mb-4">Please sign in or login to proceed further.</p>
        <p className="text-2xl text-gray-500 mt-2">Redirecting you to login...</p>
      </div>
    </div>
  );
};

export default InvalidUser;
