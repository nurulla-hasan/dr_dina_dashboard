# VitaKinetic (Dr. Dina) Admin Dashboard

A robust and modern management dashboard for the VitaKinetic (Dr. Dina) platform, built with **React 19**, **TypeScript**, and **Vite**. This dashboard provides a comprehensive suite of tools for managing users, courses, notifications, and application settings.

## 🚀 Live Demo
[View Live Site](https://dr-dina-dashboard.vercel.app/)

## ✨ Key Features

- **📊 Dashboard**: Real-time visualization of platform statistics, including earning growth and user activity.
- **👥 User Management**:
  - Detailed control over **Students**, **Teachers**, **Parents**, and **Assistance** staff.
  - Role-based user listing and filtering (Search by name/email, Status filtering).
- **📚 Course Management**:
  - Full CRUD operations for courses.
  - User assignment to specific courses via interactive modals.
  - Tabular reporting and course-specific action management.
- **🔔 Notifications**: Centralized notification system for platform-wide alerts and updates.
- **⚙️ Settings & Configuration**:
  - **Profile Management**: Edit profile details and change passwords.
  - **Content Management**: Manage FAQ, About Us, Privacy Policy, and Terms & Conditions.
  - **Rich Text Editing**: Integrated Tiptap editor for managing dynamic content.
- **🛡️ Authentication**: Complete auth flow including Login, Forgot Password, OTP Verification, and Reset Password.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit (RTK Query)](https://redux-toolkit.js.org/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tables**: [TanStack Table (React Table)](https://tanstack.com/table/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Navigation**: [React Router DOM 7](https://reactrouter.com/)
- **Editor**: [Tiptap](https://tiptap.dev/)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📂 Project Structure

- `src/app`: Page components and route-specific logic (Auth, Dashboard, Management, Settings).
- `src/components`: 
  - `ui/`: Base Shadcn components and custom UI wrappers.
  - `management/`: Feature-specific components for Users and Courses.
  - `common/`: Global layout components (Header, Sidebar, PageLayout).
- `src/redux`: Store configuration, feature slices, and RTK Query API definitions.
- `src/hooks`: Custom React hooks (e.g., `useSmartFetchHook` for data fetching).
- `src/layout`: Layout wrappers for protected and public routes.
- `src/router`: Centralized routing configuration using React Router.
- `src/schemas`: Zod validation schemas for forms.
- `src/types`: TypeScript interfaces and types for global and feature-specific entities.
- `src/lib`: Shared utility functions.

---

Built with ❤️ for  (Dr. Dina).
