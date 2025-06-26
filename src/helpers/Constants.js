import active_menu from 'assets/icons/Sidebar/dashboard.svg'
import analytics from 'assets/icons/Sidebar/analytics.svg'
import task_list_inactive from 'assets/icons/Sidebar/task_list.svg'
import delivery from 'assets/icons/Sidebar/delivery.svg'
import meeting from 'assets/icons/Sidebar/meeting.svg'
// import reports from 'assets/icons/Sidebar/reports.svg'
import user from 'assets/icons/Sidebar/user.svg'
// import market_insight from 'assets/icons/Sidebar/market.svg'
// import settings from 'assets/icons/Sidebar/settings.svg'
import logout from 'assets/icons/Sidebar/logout.svg'



export const useNavLinks = () => {
  const navLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      iconName: active_menu,
      inactiveIcon: active_menu,
      privilegesName: "dashboard",
    },

    {
      to: "/task_list",
      label: "Tasks",
      iconName: task_list_inactive,
      inactiveIcon: task_list_inactive,
      privilegesName: "task_list",
    },
    {
      to: "/ongoing_task",
      label: "Ongoing Tasks",
      iconName: task_list_inactive,
      inactiveIcon: task_list_inactive,
      privilegesName: "ongoing_task",
    },
    {
      to: "/tasks",
      label: "Create Task",
      iconName: meeting,
      inactiveIcon: meeting,
      privilegesName: "tasks",
    },
    {
      to: "/map",
      label: "Live Map",
      iconName: delivery,
      inactiveIcon: delivery,
      privilegesName: "map",
    },
    // {
    //   to: "/active_task_module",
    //   label: "Agents",
    //   iconName: analytics,
    //   inactiveIcon: analytics,
    //   privilegesName: "active_task_module",
    // },
    {
      to: "/report",
      label: "Reports",
      iconName: analytics,
      inactiveIcon: analytics,
      privilegesName: "report",
    },
    {
      to: "/user-management",
      label: "User Management",
      iconName: user,
      inactiveIcon: user,
      privilegesName: "user-management",
    },
    {
      to: "/login",
      label: "Logout",
      iconName: logout,
      inactiveIcon: logout,
      privilegesName: "logout",
      className: "logout-link",
    },
  ];

  return { navLinks }
}
