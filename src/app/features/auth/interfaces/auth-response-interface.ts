import { User } from './user-interface';
export interface AuthResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  token: string;
}
