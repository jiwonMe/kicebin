import React, { useEffect } from 'react';

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [users, setUsers] = React.useState<any[]>([]);

  useEffect(() => {
    if (user?.email !== 'park@jiwon.me') {
      navigate('/');
    }
  });
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    // setUsers(querySnapshot.docs.map((doc) => doc.data()));
    querySnapshot.docs.forEach(async (doc) => {
      const querySnapshot = await getDocs(collection(db, 'users', doc.id, 'docs'));
      console.log(doc.id, querySnapshot.docs.map((doc) => doc.data())[0].problems);
    });
  };

  return (
    <div>
      <button onClick={getUsers}>get users</button>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {/* <div>{user}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
