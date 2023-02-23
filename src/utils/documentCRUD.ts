import { analytics, db, storage } from '../service/firebase';
import { DocumentScheme } from '../types/Document';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { User } from 'firebase/auth';
import { ProblemScheme } from '../types/Problem';
import { deleteObject, ref } from 'firebase/storage';
import { logEvent } from 'firebase/analytics';

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

    // log event

    logEvent(analytics, 'create_document', {
      user: user.email,
      document_id: newDocumentId,
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

    // log event

    logEvent(analytics, 'delete_document', {
      user: user.email,
      document_id: documentId,
    });

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

const documentIntegrityCorrection = (
  user: User | null,
  document: DocumentScheme
) => {
  // user check
  if (!user || !user?.email) {
    throw Error('User is not logged in');
  }

  // meta information check
  if (!document.meta) {
    document.meta = {
      title: 'Untitled',
      description: '',
      createdAt:  new Timestamp(new Date().getTime() / 1000, 0),
      updatedAt:  new Timestamp(new Date().getTime() / 1000, 0),
      pagination: true,
    };

  }
  if (!document.meta.createdAt || !document.meta.updatedAt) {
    document.meta.createdAt = new Timestamp(new Date().getTime() / 1000, 0);
    document.meta.updatedAt = new Timestamp(new Date().getTime() / 1000, 0);
  }

  if (document.meta.pagination === undefined) {
    document.meta.pagination = true;
  }

  if (!document.meta.title) {
    document.meta.title = 'Untitled';
  }

  if (!document.meta.description) {
    document.meta.description = '';
  }

  if (!document.problems) {
    document.problems = [];
  }

  // update document to firebase

  const docRef = doc(db, 'users', user.email, 'docs', document.id);

  setDoc(docRef, document);
  return document;
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

    const correctedDocument = documentIntegrityCorrection(user, document.data() as DocumentScheme);

    if (document.exists()) {
      return correctedDocument;
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

    const correctedDocuments = documents.docs.map((document) => documentIntegrityCorrection(user, document.data() as DocumentScheme));

    // log event

    logEvent(analytics, 'get_documents', {
      user: user.email,
      document_count: correctedDocuments.length,
    });

    if (!documents.empty) {
      return correctedDocuments;
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

    // log event

    logEvent(analytics, 'update_document', {
      user: user.email,
      document_id: document.id,
    });

    await setDoc(docRef, {
      ...document,
      meta: {
        ...document.meta,
        updatedAt: new Date(),
        // if createdAt is not defined, set it to the current date
        createdAt: document.meta.createdAt || new Timestamp(new Date().getTime() / 1000, 0)
      },
    });
  } catch (error) {
    console.error(error);
  }
};
