from google.cloud import firestore

import os
import subprocess

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate(
    '/Users/jiwon/workspace/kicebin/scripts/kicebin21-firebase-adminsdk-ko8vx-73315e1ef4.json')
firebase_admin.initialize_app(cred)


def delete_backup_collections(start, end):
    # run terminal 'firebase firestore:delete -r /backup-1676250279534'
    for i in range(start, end):
        # os.system('firebase firestore:delete -r /backup-' + str(i))
        # # input 'y' to delete
        # os.system('y')

        # run subprocess to delete
        p = subprocess.Popen([
            'firebase', 'firestore:delete', '-rf', '/backup-' + str(i)
        ],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding='utf-8'
        )

        stdout, stderr = subprocess.Popen.communicate(p, input='y')

        print('delete backup-' + str(i))

if __name__ == '__main__':
    delete_backup_collections(1676250279535, 1676250279602)
