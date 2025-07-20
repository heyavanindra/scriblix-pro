import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/schema";
import * as z from "zod";
import axios from "axios";
import Cookie from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../authContext/context";
import Container from "../components/container";

type User = {
  userId: string;
  rname: string;
};

type LoginFormValues = z.infer<typeof loginSchema>;
const Login = () => {
  const { setUser, setAuthToken, currentUser } = useContext(AuthContext);

  const redirect = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (currentUser) {
    console.log("User already logged in, redirecting to dashboard...");
    return <Navigate to="/dashboard" replace />;
  }
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, data);
      Cookie.set("token", response.data.token, {
        expires: 7,
      });
      const decoded = jwtDecode<User>(response.data.token);
      setUser?.(decoded); // update context directly!
      setAuthToken?.(response.data.token);
      toast.success("Login successful!");
      redirect("/dashboard");
      console.log(
        "Login successful, token set in cookies:",
        response.data.token
      );
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
      return;
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </Container>
  );
};

export default Login;
