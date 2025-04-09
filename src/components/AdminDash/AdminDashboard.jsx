import { useState } from "react"
import Sidebar from "./Sidebar"
import DeliveryMain from "../Delivery/DeliveryMain"
import ReturnMain from "./ReturnMain"

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("delivery")

  const renderPage = () => {
    switch (activePage) {
      case "delivery":
        return <DeliveryMain />
      case "return":
        return <ReturnMain />
      case "settings":
        return <div>Settings Page</div>
      default:
        return <DeliveryMain />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 overflow-auto">{renderPage()}</div>
    </div>
  )
}

export default AdminDashboard

