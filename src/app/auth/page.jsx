import Login from "@/component/login"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

async function Page() {
  const session = await getServerSession()
	if(session){
		redirect('/dashboard')
	}
  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <Login />
    </div>
  )
}

export default Page