import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/main-layout";
import { lazy } from "react";
import AuthLayout from "@/layout/auth-layout";
import ProtectedRoute from "@/layout/protected-route";

//======================================================================================================================
// App pages (all under src/app)
const Profile = lazy(() => import("@/app/settings/profile/Profile"));
const Privacy = lazy(() => import("@/app/settings/privacy/Privacy"));
const Disclaimers = lazy(() => import("@/app/settings/disclimers/Disclimers"));
const Terms = lazy(() => import("@/app/settings/terms/Terms"));
const About = lazy(() => import("@/app/settings/about-us/About"));
const FAQ = lazy(() => import("@/app/settings/faq/Faq"));

const Dashboard = lazy(() => import("@/app/dashboard/Dashboard"));
const Users = lazy(() => import("@/app/management/users/Users"));
const Courses = lazy(() => import("@/app/management/courses/Courses"));
const CourseDetails = lazy(() => import("@/app/management/courses/CourseDetails"));
const TeacherList = lazy(() => import("@/app/management/teachers/Teachers"));
const AssistanceList = lazy(() => import("@/app/management/assistance/Assistance"));
const StudentsList = lazy(() => import("@/app/management/students/Students"));
const ParentsList = lazy(() => import("@/app/management/parents/Parents"));
const Notifications = lazy(() => import("@/app/notifications/Notifications"));
const Login = lazy(() => import("@/app/auth/Login"));
const ForgotPassword = lazy(() => import("@/app/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/app/auth/ResetPassword"));
const CodeVerification = lazy(() => import("@/app/auth/CodeVerification"));

//======================================================================================================================

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },

            // Management
            { path: "users", element: <Users /> },
            { path: "courses", element: <Courses /> },
            { path: "courses/:id", element: <CourseDetails /> },
            
            // User Roles
            { path: "teachers", element: <TeacherList /> },
            { path: "assistance", element: <AssistanceList /> },
            { path: "students", element: <StudentsList /> },
            { path: "parents", element: <ParentsList /> },

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