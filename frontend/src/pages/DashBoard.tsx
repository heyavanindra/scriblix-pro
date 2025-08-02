import Container from "../components/container";

// const apiUrl = import.meta.env.VITE_API_URL;

const DashBoard = () => {


  return (
    <Container keyval="dashboard">
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
