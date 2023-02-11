import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore';

const IndexPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  });
  return (
    <div>IndexPage</div>
  );
};

export default IndexPage;
