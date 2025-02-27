import React from "react"
import { TruckIcon, UsersIcon, SettingsIcon } from "lucide-react"

const Sider = ({ setActivePage, activePage }) => {
  const menuItems = [
    { id: "MyWishList", icon: UsersIcon, label: "My wishlist" },
    { id: "MyOrders", icon: TruckIcon, label: "My Orders" },
    { id: "ReturnItem", icon: SettingsIcon, label: "Return Item"},
  ]

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center p-4 text-gray-700 hover:bg-gray-100 ${
              activePage === item.id ? "bg-gray-200" : ""
            }`}
          >
            <item.icon className="mr-4" size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sider