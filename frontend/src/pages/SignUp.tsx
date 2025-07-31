import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schema/schema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/container";
import { useContext } from "react";
import { AuthContext } from "../authContext/context";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type SignUpformValue = z.infer<typeof signupSchema>;
const SignUp = () => {
  const redirect = useNavigate();

 const {authToken} =  useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpformValue> = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/signup`, data);
      console.log(response);
      if (response.status !== 201) {
        console.error("Error during signup:", response.data);
        return;
      }

      toast.success("User Created");
      redirect("/login");
      console.log(
        "signup successful, token set in cookies:",
        response.data.token
      );
    } catch (error) {
      console.log("error");
      const axiosError = error as AxiosError<{ message: string }>;

      const errorMessage =
        axiosError.response?.data?.message ||
        "Something went wrong during signup.";

      toast.error("Error occurred: " + errorMessage);
      console.error(error);
    }
  };

  return (
   authToken ? <Navigate to={'/'}></Navigate> :  
      <Container key="signup-page">
        <div className="flex pt-40 items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-6 rounded-xl bg-white p-8 shadow-lg"
          >
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Sign Up
            </h2>

            <div className="space-y-1">
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <div>
              Already A User? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </Container>
  );
};

export default SignUp;
