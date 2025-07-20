import Container from "../components/container"

const DashBoard = () => {
  
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-lg">This is your dashboard where you can manage your content.</p>
      </div>
    </Container>
  )
}

export default DashBoard