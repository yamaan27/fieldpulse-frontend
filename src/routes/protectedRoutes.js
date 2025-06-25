import { Suspense, lazy } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
// import React from 'react'

const DashboardPage = lazy(
  () => import('../pages/admin/dashboard/DashboardPage')
)
const LiveMapPage = lazy(() => import("../pages/admin/liveMap/liveMapPage"));
// const LiveMapPage = lazy(() => import("../pages/admin/liveMap/LiveMapPage"));

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
const MeetingLogPage = lazy(
  () => import("../pages/admin/MeetingLog/MeetingLogPage")
);
const AddMeetingPage = lazy(
  () => import("../pages/admin/MeetingLog/AddMeetingPage")
);
const MeetingDetailPage = lazy(
  () => import("../pages/admin/MeetingLog/MeetingDetail")
);
const ProjectInsightsPage = lazy(
  () => import("../pages/admin/ProjectInsights/ProjectInsightsPage")
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
    path: "/map",
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
            <LiveMapPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/tasks",
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
            <MeetingLogPage />
          </Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddMeetingPage />
          </Suspense>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MeetingDetailPage />
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
    path: "/report",
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
            <ProjectInsightsPage />
          </Suspense>
        ),
      },
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
