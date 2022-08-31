import { useNavigate } from "react-router-dom";

export function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return user;
  } catch (err: unknown) {
    return false;
  }
}

export function getToken() {
  try {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return user.token;
  } catch (err: unknown) {
    return false;
  }
}

export function logout() {
  const navigate = useNavigate();
  localStorage.setItem('user', JSON.stringify({}));
  navigate('/login')
}
