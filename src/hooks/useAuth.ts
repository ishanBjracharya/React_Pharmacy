import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = (username: string, password: string) => {
    // TODO: Implement login logic
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
}