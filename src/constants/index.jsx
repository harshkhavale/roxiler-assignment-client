import {
    HomeIcon,
    LayoutDashboard,
    Lock,
    ShieldEllipsis,
    Star,
    Store,
    UserIcon,
  } from "lucide-react";
  
  export const dashboardOptions = {
    user: [
      { label: "Dashboard", path: "/dashboard/user", icon: <LayoutDashboard /> },
  
      {
        label: "Change Password",
        path: "/dashboard/user/change-password",
        icon: <Lock />,
      },
    ],
    owner: [
      { label: "Dashboard", path: "/dashboard/owner", icon: <HomeIcon /> },
      { label: "Ratings", path: "/dashboard/owner/ratings", icon: <Star /> },
      {
        label: "Change Password",
        path: "/dashboard/owner/change-password",
        icon: <Lock />,
      },
    ],
    admin: [
      { label: "Dashboard", path: "/dashboard/admin", icon: <ShieldEllipsis /> },
      { label: "Stores", path: "/dashboard/admin/stores", icon: <Store /> },
      { label: "Users", path: "/dashboard/admin/users", icon: <UserIcon /> },
      {
        label: "Change Password",
        path: "/dashboard/admin/change-password",
        icon: <Lock />,
      },
    ],
  };