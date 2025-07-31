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
  username: string;
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
      setUser?.(decoded);
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
      <Container key="user">
        <div className="flex flex-col justify-center items-center py-40 bg-main">
          <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto bg-main p-8 rounded-xl shadow-md space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800" >
            Login to your account
          </h2>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              {...register("username")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              {...register("password")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        </div>
      </Container>
  );
};

export default Login;
