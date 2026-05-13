import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Projects from "../Pages/Projects/Projects";
import ProjectDetails from "../Pages/Projects/ProjectDetails";
import Services from "../Pages/Services/Services";
import Contact from "../Pages/Contact/Contact";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Dashboard from "../Layout/Dashboard";
import Overview from "../Pages/Dashboard/Overview";
import ManageProjects from "../Pages/Dashboard/ManageProjects";
import ManageBlogs from "../Pages/Dashboard/ManageBlogs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Authentication/Login";
import AdminRoute from "./AdminRoute";
import Settings from "../Pages/Dashboard/Settings";
import Subscribers from "../Pages/Dashboard/Subscribers";
import Review from "../Pages/Testmonials/Review";
import ManageTestmonials from "../Pages/Dashboard/ManageTestmonials";
import AddBlogs from "../Pages/Dashboard/AddBlogs";
import AddProject from "../Pages/Dashboard/AddProject";
import ManagePricing from "../Pages/Dashboard/ManagePricing";
import Inquires from "../Pages/Dashboard/Inquires";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "project-details/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/submit-review",
        element: <Review />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "manage-subscribers",
        element: <Subscribers />,
      },
      {
        path: "manage-testmonials",
        element: <ManageTestmonials />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogs />,
      },
      {
        path: "add-blog",
        element: <AddBlogs />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "manage-projects",
        element: <ManageProjects />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      },
      {
        path: "manage-pricing",
        element: <ManagePricing />,
      },
      {
        path: "manage-inquires",
        element: <Inquires />,
      },
    ],
  },
]);

export default router;
