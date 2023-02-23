from google.cloud import firestore

import firebase_admin
from firebase_admin import credentials

# load credentials
cred = credentials.Certificate(
    '/Users/jiwon/workspace/kicebin/scripts/kicebin21-firebase-adminsdk-ko8vx-e79de0fad4.json')
firebase_admin.initialize_app(cred)

# initialize firestore
db = firestore.Client()

def updateAllDocument():
  """
  interface DocumentScheme {
    id: string;
    meta: {
      title: string;
      description: string;
      pagination: boolean;
      createdAt: Timestamp;
      updatedAt: Timestamp;
    }
    problems: ProblemScheme[];
  }

  to

  interface DocumentScheme {
    id: string;
    meta: {
      title: string;
      description: string;
      pagination: boolean;
      createdAt: Timestamp;
      updatedAt: Timestamp;
      owner: string;
      isPublic: boolean;
      invitees: string[];
    }
    problems: ProblemScheme[];
  }

  """

  # update all documents

  userCollection = db.collection('users')

  # get user
  users = userCollection.stream()

  userDocumentMap = {}

  for user in users:
      userDocumentMap[user.id] = user.to_dict()

      # get docs from user collection
      # {user} / {doc} / {doc id}
      userDocCollection = userCollection.document(user.id).collection('docs')

      docs = userDocCollection.stream()

      for doc in docs:
          docData = doc.to_dict()

          print(docData)

          # update doc
          userDocCollection.document(doc.id).update({
              'meta': {
                  'title': docData['meta']['title'],
                  'description': docData['meta']['description'],
                  'pagination': docData['meta']['pagination'],
                  # if createdAt is not exist, set new timestamp
                  'createdAt': docData['meta']['createdAt'] if 'createdAt' in docData['meta'] else firestore.SERVER_TIMESTAMP,
                  'updatedAt': docData['meta']['updatedAt'] if 'updatedAt' in docData['meta'] else firestore.SERVER_TIMESTAMP,
                  'owner': user.id,
                  'isPublic': False,
                  'invitees': []
              }
          })

def updateAllProblems():
  """
  update all problems to seperate collection's document
  """

  # update all documents

  userCollection = db.collection('users')

  # get user
  users = userCollection.stream()

  for user in users:
      # get docs from user collection
      # {user} / {doc} / {doc id}
      userDocCollection = userCollection.document(user.id).collection('docs')

      docs = userDocCollection.stream()

      for doc in docs:
          docData = doc.to_dict()

          print(docData)

          problems = docData['problems']

          # create problem collection
          problemCollection = userDocCollection.document(doc.id).collection('problems')

          for problem in problems:
             # create problem document with problem id
              problemCollection.document(problem['id']).set(problem)

          # delete problems field
          # userDocCollection.document(doc.id).update({
              # 'problems': firestore.DELETE_FIELD
          # })


if __name__ == '__main__':
  # updateAllDocument()
  updateAllProblems()
