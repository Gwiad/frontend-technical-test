const getUserById = (userId: number) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`).then((res) =>
    res.json()
  );

export default getUserById;
