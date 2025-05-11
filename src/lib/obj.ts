type User = {
  name: string;
  age: number;
};

export const updateUserName = (user: User, name: string) => {
  const newUser = {
    ...user,
    name,
  };

  return newUser;
};
