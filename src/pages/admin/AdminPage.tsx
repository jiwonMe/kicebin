import React, { useEffect } from 'react';

import { collection, getDocs, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserScheme } from '../../types/User';
import { DocumentScheme } from '../../types/Document';
import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import _DocumentListContainer from '../../components/DocumentListContainer';

const AdminPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [users, setUsers] = React.useState<UserScheme[]>([]);

  const [docsByUser, setDocsByUser] = React.useState<Map<string, DocumentScheme[]>>(new Map());

  const [docs, setDocs] = React.useState<DocumentScheme[]>([]);

  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  useEffect(() => {
    if (user?.email !== 'park@jiwon.me') {
      navigate('/');
    }
  });
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));

    const newDocsByUserMap: Map<string, DocumentScheme[]> = new Map();

    const newDocs: DocumentScheme[] = [];

    querySnapshot.docs.sort().forEach(async (userDoc) => {
      // console.log(userDoc.data() as UserScheme);
      const docsQuerySnapshot = await getDocs(collection(db, 'users', userDoc.id, 'docs'));

      const numberOfDocs = docsQuerySnapshot.docs.length;
      const numberOfProblems = docsQuerySnapshot.docs.reduce((acc, cur) => {
        const data = cur.data() as DocumentScheme;
        return acc + data.problems.length;
      }, 0);

      // console.log(userDoc.id, numberOfDocs, numberOfProblems, docsQuerySnapshot.docs.map((doc) => doc.data() as DocumentScheme));

      newDocsByUserMap.set(userDoc.id, docsQuerySnapshot.docs.map((doc) => doc.data() as DocumentScheme));

      setDocsByUser(newDocsByUserMap);

      newDocs.push(...docsQuerySnapshot.docs.map((doc) => doc.data() as DocumentScheme));
    });

    setUsers(querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      email: doc.id,
    }) as UserScheme));
    setDocs(newDocs);

    console.log(docs);
    console.log(users.length, docs.length);
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
    <EntireLayout>
      <TopLayout>
        <TopBar
          actionButtons={[
            (
              <Button
                key={0}
                onClick={getUsers}
              >get docs</Button>
            ),
            (
              <Button
                key={1}
                onClick={() => {
                  console.log(docsByUser);
                }}
              >log docs</Button>
            )
          ]}
        />
      </TopLayout>
      <TopLayoutPadding />
      <MainLayout>

        <UserContainerLayout>
          {users.sort(
            (a, b) => {
              // sort by number of problems
              const aNumberOfProblems = docsByUser.get(a.email!)?.reduce((acc, cur) => acc + cur.problems.length, 0) || 0;
              const bNumberOfProblems = docsByUser.get(b.email!)?.reduce((acc, cur) => acc + cur.problems.length, 0) || 0;

              return bNumberOfProblems - aNumberOfProblems;
            },
          ).map((user) => (
            <UserListCell
              user={user}
              isActivated={user.email === selectedUserId}
              setSelectedUserId={(email) => {
                setSelectedUserId(email);
              }}
              docsByUser={docsByUser}
              key={user.email}
            />
          ))}
        </UserContainerLayout>
        <ContentLayout>
          <DocumentListContainer
            updateDocument={(document) => {
              // console.log(document);
            }}
            deleteDocument={(document) => {
              // console.log(document);
            }}
            documentList={docsByUser.get(selectedUserId!) || []}
          />
        </ContentLayout>
      </MainLayout>
    </EntireLayout>
  );
};

export default AdminPage;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding-top: 20px;

  width: 100%;

  padding: 20px;
`;

const DocumentListContainer = styled(_DocumentListContainer)`
  height: auto;
`;

const EntireLayout = styled.div`
  height: 100vh;

  box-sizing: border-box;
`;

const TopLayout = styled.div`
  display: flex;

  position: fixed;
  width: 100%;

  height: 64px;
  background-color: #232327;
`;

const TopLayoutPadding = styled.div`
  width: 100%;
  height: 64px;
`;

const MainLayout = styled.div`
  display: flex;
  /* flex-direction: column; */

  height: calc(100vh - 64px);

  box-sizing: border-box;

  background-color: #1A1A1C;
`;

const Button = styled.div`
  background-color: #37373E;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #BABAC2;
  gap: 8px;

  height: 40px;

  box-sizing: border-box;

  cursor: pointer;
  :hover {
    background-color: #86868613;
  }
`;

const UserContainerLayout = styled.div`
  border-right: 0.5px solid #484848;
  display: flex;
  flex-direction: column;

  width: 20%;

  overflow-y: scroll;
  overflow-x: auto;

  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserListCell = ({
  user,
  docsByUser,
  isActivated,
  setSelectedUserId,
}: {
  user: UserScheme,
  docsByUser: Map<string, DocumentScheme[]>,
  isActivated: boolean,
  setSelectedUserId: (email: string) => void,
}) => {
  return (
    <UserListCellLayout
      isActivated={isActivated}
      onClick={() => {
        setSelectedUserId(user.email!);
      }}
    >
      <UserListCellTitle>{user.email}</UserListCellTitle>
      <UserListCellDescription>
        {docsByUser.get(user.email!)?.length ?? 0} Documents, {docsByUser.get(user.email!)?.reduce((acc, cur) => acc + cur.problems.length, 0) ?? 0} Problems
      </UserListCellDescription>
    </UserListCellLayout>
  );
};


const UserListCellTitle = styled.div`
  font-size: 16px;
  color: #aaa;
`;

const UserListCellDescription = styled.div`
  font-size: 14px;
`;

const UserListCellLayout = styled.div<{
  isActivated?: boolean,
}>`
  ${props => props.isActivated ? `
    border-bottom: 1px solid #37373A;
    background-color: #232327;
  ` : `
    border-bottom: 1px solid #37373A;
    background-color: #1A1A1C;
  `}
  /* width: 200px; */
  color: #7E7E8C;
  height: fit-content;
  /* min-height: 50px; */
  padding: 12px;
`;
