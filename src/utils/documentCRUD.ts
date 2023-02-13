import { db, storage } from '../service/firebase';
import { DocumentScheme } from '../types/Document';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { User } from 'firebase/auth';
import { ProblemScheme } from '../types/Problem';
import { deleteObject, ref } from 'firebase/storage';

export const createDocument = async (
  user: User | null,
  document: DocumentScheme,
) => {
  const newDocumentId = uuid();

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'docs', newDocumentId);

    await setDoc(docRef, {
      ...document,
      id: newDocumentId,
    });

    return {
      ...document,
      id: newDocumentId,
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (
  user: User | null,
  documentId: string,
) => {

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'docs', documentId);

    const document = await getDoc(docRef);

    if (!document.exists()) {
      throw Error('Document does not exist');
    }

    const problems = document.data()?.problems;

    // Delete images
    problems.forEach(async (problem: ProblemScheme) => {
      problem.content.forEach(async (block) => {
        if (block.type === 'IMAGE') {
          const imageRef = ref(storage, `images/${block.id}`);
          await deleteObject(imageRef);
        }
      });
    });

    deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};

export const getDocument = async (
  user: User | null,
  documentId: string,
) => {

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'docs', documentId);

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

export const getDocuments = async (
  user: User | null,
) => {

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const collectionRef = collection(db, 'users', user.email, 'docs');

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
  user: User | null,
  document: DocumentScheme,
) => {

  try {
    if (!user || !user?.email) {
      throw Error('User is not logged in');
    }

    const docRef = doc(db, 'users', user.email, 'docs', document.id);

    await setDoc(docRef, {
      ...document,
      meta: {
        ...document.meta,
        updatedAt: new Date(),
        // if createdAt is not defined, set it to the current date
        createdAt: document.meta.createdAt || new Date(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
