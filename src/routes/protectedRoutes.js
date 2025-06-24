import { Suspense, lazy } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
// import React from 'react'

const DashboardPage = lazy(
  () => import('../pages/admin/dashboard/DashboardPage')
)
const AccountMasterPage = lazy(
  () => import("../pages/admin/Account/AccountMasterPage")
);
const UserManagementPage = lazy(
  () => import("../pages/admin/UserManagement/UserManagementPage")
);
const UserManagementForm = lazy(
  () => import("../pages/admin/UserManagement/UserFormPage")
);
const UserManagementDetailPage = lazy(
  () => import("../pages/admin/UserManagement/UserDetailsPage")
);

const protectedRoutes = [
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/task_list",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AccountMasterPage />
          </Suspense>
        ),
      },
      // {
      //   path: "detail/:id",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <AccountMasterDetailPage />
      //     </Suspense>
      //   ),
      // },
    ],
  },
  {
    path: "/user-management",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    notAllowedRoles: ["PM", "BDM", "CS"],
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserManagementPage />
          </Suspense>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserManagementDetailPage />
          </Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserManagementForm />
          </Suspense>
        ),
      },
    ],
  },
];

export default protectedRoutes
