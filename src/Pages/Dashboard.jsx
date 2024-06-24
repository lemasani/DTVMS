import { useAuth } from "../Utils/Auth"



export default function Dashboard() {
  useAuth()
  return (
    <>
        <h1>Dashboard</h1>
    </>
  )
}
