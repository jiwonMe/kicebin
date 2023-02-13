import React, { useEffect } from 'react';

import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
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

  const correctDocumentId = async () => {
    const userQuerySnapshot = await getDocs(collection(db, 'users'));

    userQuerySnapshot.docs.forEach(async (userDoc) => {
      const documentQuerySnapshot = await getDocs(collection(db, 'users', userDoc.id, 'docs'));

      documentQuerySnapshot.docs.forEach(async (documentDoc) => {
        const document = documentDoc.data();
        const newDocument = {
          ...document,
          id: documentDoc.id,
        };
        await updateDoc(documentDoc.ref, newDocument);
      });
    });
  };

  const createBackup = async () => {
    const backupDateString = new Date().getTime().toString();

    const userQuerySnapshot = await getDocs(collection(db, 'users'));

    userQuerySnapshot.docs.forEach(async (userDoc) => {
      const documentQuerySnapshot = await getDocs(collection(db, 'users', userDoc.id, 'docs'));

      documentQuerySnapshot.docs.forEach(async (documentDoc) => {
        const document = documentDoc.data();
        const newDocument = {
          ...document,
          id: documentDoc.id,
        };

        await setDoc(doc(db, `backup-${backupDateString}`, userDoc.id, 'docs', documentDoc.id), newDocument);
      });
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
      <button onClick={correctDocumentId}>
        correct document id
      </button>
      <button onClick={createBackup}>
        create backup
      </button>
    </div>
  );
};

export default AdminPage;
