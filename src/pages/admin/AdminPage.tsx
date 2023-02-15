import React, { useEffect } from 'react';

import { collection, getDocs, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserScheme } from '../../types/User';
import { DocumentScheme } from '../../types/Document';

const AdminPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [users, setUsers] = React.useState<UserScheme[]>([]);

  const [docsByUser, setDocsByUser] = React.useState<{ [key: string]: DocumentScheme[] }>({});

  useEffect(() => {
    if (user?.email !== 'park@jiwon.me') {
      navigate('/');
    }
  });
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));

    querySnapshot.docs.sort().forEach(async (userDoc) => {
      // console.log(userDoc.data() as UserScheme);
      const docsQuerySnapshot = await getDocs(collection(db, 'users', userDoc.id, 'docs'));

      const numberOfDocs = docsQuerySnapshot.docs.length;
      const numberOfProblems = docsQuerySnapshot.docs.reduce((acc, cur) => {
        const data = cur.data() as DocumentScheme;
        return acc + data.problems.length;
      }, 0);

      console.log(userDoc.id, numberOfDocs, numberOfProblems, docsQuerySnapshot.docs.map((doc) => doc.data() as DocumentScheme));

      setDocsByUser({
        ...docsByUser,
        [userDoc.id]: docsQuerySnapshot.docs.map((doc) => doc.data() as DocumentScheme),
      });
    });

  };

  const createBackup = async () => {
    const backupDateString = new Date().toISOString();

    const userQuerySnapshot = await getDocs(collection(db, 'users'));

    userQuerySnapshot.docs.forEach(async (userDoc) => {
      const documentQuerySnapshot = await getDocs(collection(db, 'users', userDoc.id, 'docs'));

      documentQuerySnapshot.docs.forEach(async (documentDoc) => {
        const document = documentDoc.data();
        const newDocument = {
          ...document,
          id: documentDoc.id,
        };

        await setDoc(doc(db, 'backup', backupDateString, 'users', userDoc.id, 'docs', documentDoc.id), newDocument);
      });
    });

    console.log('backup created');
  };

  return (
    <div>
      <button onClick={getUsers}>get users</button>
      <div>
        {users.map((user) => (
          <div key={user.uid}>
            <div>{user.email}</div>
            <div>{user.uid}</div>
            {
              user.email && docsByUser[user.email] && docsByUser[user.email].map((doc) => (
                <div key={doc.id}>
                  <div>{doc.meta.title}</div>
                  <div>{doc.meta.description}</div>
                  <div>{doc.problems.length}</div>
                </div>
              ))
            }
          </div>
        ))}
      </div>
      <button onClick={createBackup}>
        create backup
      </button>
    </div>
  );
};

export default AdminPage;
