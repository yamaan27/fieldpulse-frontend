import { Suspense, lazy } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
// import React from 'react'

const DashboardPage = lazy(
  () => import('../pages/admin/dashboard/DashboardPage')
)
const LiveMapPage = lazy(() => import("../pages/admin/liveMap/liveMapPage"));
const PayoutsPage = lazy(() => import("../pages/admin/payouts/payoutsPage"));

const TaskListPage = lazy(
  () => import("../pages/admin/TaskList/TaskListPage")
);
const OngoingTaskPage = lazy(

  () => import("../pages/admin/OngoingTask/OngoingTaskPage")
);
const CompletedTaskPage = lazy(
  () => import("../pages/admin/CompletedTask/CompletedTaskPage")
);
const OngoingTaskDetailsPage = lazy(
  () => import("../pages/admin/OngoingTask/OngoingTaskDetailsPage")
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
const TaskDetailsPage = lazy(
  () => import("../pages/admin/TaskList/TaskDetailsPage")
);
const CreateTaskPage = lazy(
  () => import("../pages/admin/CreateTask/CreateTaskPage")
);
const AddTaskPage = lazy(
  () => import("../pages/admin/CreateTask/AddTaskPage")
);
const TaskDetailPage = lazy(
  () => import("../pages/admin/CreateTask/TaskDetail")
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
    path: "/payouts",
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
            <PayoutsPage />
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
            <CreateTaskPage />
          </Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddTaskPage />
          </Suspense>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TaskDetailPage />
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
            <TaskListPage />
          </Suspense>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TaskDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/ongoing_task",
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
            <OngoingTaskPage />
          </Suspense>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OngoingTaskDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/completed_task",
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
            <CompletedTaskPage />
          </Suspense>
        ),
      },
      // {
      //   path: "details/:id",
      //   element: (
      //     <Suspense fallback={<div>Loading...</div>}>
      //       <OngoingTaskDetailsPage />
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
