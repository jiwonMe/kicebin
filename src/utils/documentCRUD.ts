import { useAuthStore } from '../store/AuthStore';
import { db } from '../service/firebase';
import { DocumentScheme } from '../types/Document';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export const createDocument = async (
  document: DocumentScheme,
) => {
  const { user } = useAuthStore();
  const newDocumentId = uuid();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'documents', newDocumentId);

    await setDoc(docRef, document);

    return newDocumentId;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (
  documentId: string,
) => {
  const { user } = useAuthStore();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'documents', documentId);

    deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};

export const getDocument = async (
  documentId: string,
) => {
  const { user } = useAuthStore();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'documents', documentId);

    const document = await getDoc(docRef);

    if (document.exists()) {
      return document.data() as DocumentScheme;
    } else {
      throw Error('Document does not exist');
    }
  } catch (error) {
    console.error(error);
  }
};

export const getDocuments = async () => {
  const { user } = useAuthStore();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const collectionRef = collection(db, 'users', user.email, 'documents');

    const documents = await getDocs(collectionRef);

    if (!documents.empty) {
      return documents.docs.map((document) => document.data()) as DocumentScheme[];
    } else {
      throw Error('No documents exist');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async (
  document: DocumentScheme,
) => {
  const { user } = useAuthStore();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'documents', document.id);

    await setDoc(docRef, document);
  } catch (error) {
    console.error(error);
  }
};
