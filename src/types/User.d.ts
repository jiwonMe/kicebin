import { User } from 'firebase/auth';

export interface UserScheme extends User {
  uid: string | null;
  displayName?: string;
  photoURL?: string;
  email?: string;
  accessToken?: string;
  stsTokenManager?: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
}
