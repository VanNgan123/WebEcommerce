import axiosUser from "../axiosUser";

interface UserSignup {
  username: string;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupRequest = async (payload: UserSignup) => {
  try {
    // Kiểm tra xem email có tồn tại chưa
    const response: any[] = await axiosUser.get("/users");
    const existingUser = response.find(
      (user) =>
        user.email === payload.email || user.username === payload.username
    );

    return !existingUser;
  } catch (error) {
    return null;
  }
};
