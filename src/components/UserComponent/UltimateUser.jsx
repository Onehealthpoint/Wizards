import { useState } from "react"
import Sider from "./Sider"
import UserDashboard from "./UserDashboard"
import ReturnUserItem from "./ReturnUserItem"
import ClientComponent from "./ClientComponent"

const UltimateUser = () => {
  const [activePage, setActivePage] = useState("delivery")

  const renderPage = () => {
    switch (activePage) {
        case "MyWishList":
            return <ClientComponent />
        case "MyOrders":
            return <UserDashboard />
        case "ReturnItem":
            return <ReturnUserItem />
      default:
        return <ClientComponent/>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sider setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-auto">{renderPage()}</div>
    </div>
  )
}

export default UltimateUser

