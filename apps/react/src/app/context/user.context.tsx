import { IUser, UserWithToken } from '@circle-app/api-interfaces';
import { createContext, ReactNode, useState } from 'react';

export interface UserContextType {
  user: UserWithToken;
  dispatcher: (user: UserWithToken) => void;
}
export const UserContext = createContext<UserContextType | null>(null);

export default function ContextProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithToken>(
    JSON.parse(localStorage.getItem('user-data') || 'null')
  );
  const dispatcher = (user: UserWithToken) => {
    localStorage.setItem('user-data', JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, dispatcher }}>
      {props.children}
    </UserContext.Provider>
  );
}
