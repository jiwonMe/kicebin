from google.cloud import firestore

import time
import firebase_admin
from firebase_admin import credentials

# load credentials
cred = credentials.Certificate(
    '/Users/jiwon/workspace/kicebin/scripts/kicebin21-firebase-adminsdk-ko8vx-e79de0fad4.json')
firebase_admin.initialize_app(cred)

# initialize firestore
db = firestore.Client()

# get all docs
users = db.collection('users').stream()

# create backup collection
# backup / {time}
backupCollection = db.collection('backup').document(str(int(time.time())))

# create backup
for user in users:
    # get user collection
    userCollection = db.collection('users').document(user.id).collection('docs')
