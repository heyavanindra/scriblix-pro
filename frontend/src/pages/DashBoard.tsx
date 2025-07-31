import { useEffect, useState } from "react";
import Container from "../components/container";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const DashBoard = () => {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/article`);
        setBlogs(response.data.article);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data.message || "Something went wrong"
        );
        console.error(
          axiosError.response?.data.message ||
            "Something went wrong in Dashboard"
        );
      }
    };
    getAllBlogs();
  }, []);

  return (
    <Container key="dashboard">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-lg">
          This is your dashboard where you can manage your content.
        </p>
        <>
        <div>
          
        </div>
        </>
      </div>
    </Container>
  );
};

export default DashBoard;
