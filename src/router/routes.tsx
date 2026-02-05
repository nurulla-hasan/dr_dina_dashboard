import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/main-layout";
import { lazy } from "react";
import AuthLayout from "@/layout/auth-layout";

//======================================================================================================================
// App pages (all under src/app)
const Dashboard = lazy(() => import("@/app/dashboard/Dashboard"));
const Profile = lazy(() => import("@/app/settings/profile/Profile"));
const Privacy = lazy(() => import("@/app/settings/privacy/Privacy"));
const Disclaimers = lazy(() => import("@/app/settings/disclimers/Disclimers"));
const Terms = lazy(() => import("@/app/settings/terms/Terms"));
const About = lazy(() => import("@/app/settings/about-us/About"));
const FAQ = lazy(() => import("@/app/settings/faq/Faq"));
const Users = lazy(() => import("@/app/management/users/Users"));
const Admins = lazy(() => import("@/app/management/admins/Admins"));
const Trainers = lazy(() => import("@/app/management/trainers/Trainers"));
const Programs = lazy(() => import("@/app/management/programs/Programs"));
const Gyms = lazy(() => import("@/app/management/gyms/Gyms"));
const Newsfeed = lazy(() => import("@/app/management/newsfeed/Newsfeed"));
const Notifications = lazy(() => import("@/app/notifications/Notifications"));
const Subscriptions = lazy(() => import("@/app/management/subscriptions/Subscriptions"));
const Fees = lazy(() => import("@/app/management/fees/Fees"));
const Tickets = lazy(() => import("@/app/management/tickets/Tickets"));
const Reviews = lazy(() => import("@/app/management/reviews/Reviews"));
const Login = lazy(() => import("@/app/auth/Login"));
const ForgotPassword = lazy(() => import("@/app/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/app/auth/ResetPassword"));
const CodeVerification = lazy(() => import("@/app/auth/CodeVerification"));

//======================================================================================================================

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Dashboard /> },

            // Management
            { path: "management/users", element: <Users /> },
            { path: "management/admins", element: <Admins /> },
            { path: "management/trainers", element: <Trainers /> },
            { path: "management/programs", element: <Programs /> },
            { path: "management/gyms", element: <Gyms /> },
            { path: "management/newsfeed", element: <Newsfeed /> },
            { path: "management/subscriptions", element: <Subscriptions /> },
            { path: "management/fees", element: <Fees /> },
            { path: "management/tickets", element: <Tickets /> },
            { path: "management/reviews", element: <Reviews /> },
            { path: "notifications", element: <Notifications /> },
            // Settings
            { path: "settings/profile", element: <Profile /> },
            { path: "settings/about", element: <About /> },
            { path: "settings/terms", element: <Terms /> },
            { path: "settings/disclaimers", element: <Disclaimers /> },
            { path: "settings/privacy", element: <Privacy /> },
            { path: "settings/faq", element: <FAQ /> },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "verify", element: <CodeVerification /> },
        ]
    }
]);