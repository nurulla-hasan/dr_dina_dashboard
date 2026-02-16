/* eslint-disable react-hooks/set-state-in-effect */
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Settings,
  LogOut,
  ChevronDown,
  UserRoundPen,
  BadgeInfo,
  ReceiptText,
  MessageCircleQuestion,
  LayoutGrid,
  ShieldCheck,
  BookOpen,
  User,
  Handshake,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";

const MAIN_NAV_ITEMS = [
  { name: "Overview", icon: LayoutGrid, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "Teacher List", icon: User, href: "/teachers" },
  { name: "Assistance List", icon: Handshake, href: "/assistance" },
  { name: "Students List", icon: FileText, href: "/students" },
  { name: "Parents List", icon: ShieldCheck, href: "/parents" },
];

const SETTINGS_SUB_ITEMS = [
  { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
  { name: "Privacy Policy", icon: BadgeInfo, href: "/settings/privacy" },
  { name: "Terms", icon: ReceiptText, href: "/settings/terms" },
  { name: "FAQ", icon: MessageCircleQuestion, href: "/settings/faq" },
];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = useRef(location);
  const section = location.pathname.split("/")[1] || "";
  const isSettingsPath = section === "settings";

  const [isSettingsOpen, setIsSettingsOpen] = useState(isSettingsPath);

  useEffect(() => {
    if (isSettingsPath) setIsSettingsOpen(true);
  }, [isSettingsPath]);

  useEffect(() => {
    if (prevLocation.current !== location && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    prevLocation.current = location;
  }, [location, isSidebarOpen, setIsSidebarOpen]);

  // const handleLogout = () => {
  //     dispatch(setAdmin(null));
  //     dispatch(setAccessToken(null));
  //     localStorage.removeItem("accessToken");
  //     window.location.href = "/auth/login";
  // };

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen bg-sidebar w-64 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col`}
    >
      <div className="flex flex-col items-center px-6 py-4">
        <Link to="/" className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="GRABBY Logo"
            className="h-25 w-auto dark:invert"
          />
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-149px)]">
        <nav className="grow space-y-2 p-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200
                ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <div className="flex items-center text-sm px-2">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </div>
            </NavLink>
          ))}

          {/* Settings group */}
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger
              className={`w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isSettingsPath
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isSettingsOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {SETTINGS_SUB_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </ScrollArea>
      <div className="border-t border-sidebar-border p-4">
        <Link to="/auth/login" className="block w-full text-center">
          <Button
            variant="outline"
            className="justify-start w-full"
          >
            <LogOut />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
