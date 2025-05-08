import { UserType } from "@/types/types"
import ClientDashboard from "./ClientDashboard"

const AdminDashboardPage = async ({ user }: { user: UserType }) => {
  // Fetch data as in the original component
  const getProducts = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/products/all`)
  const productsData = await getProducts.json()

  const getProducers = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/producers`)
  const producersData = await getProducers.json()

  const getDistributors = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/all`)
  const distributorsData = await getDistributors.json()
  console.log(distributorsData)

  // Get current date for display
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const users = {
    ...user,
    _id: user._id.toString(),
  }

  return (
    <ClientDashboard
      user={users}
      productsData={productsData}
      producersData={producersData}
      distributorsData={distributorsData}
      currentDate={currentDate}
    />
  )
}

export default AdminDashboardPage