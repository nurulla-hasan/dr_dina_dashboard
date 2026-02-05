/* eslint-disable react-hooks/set-state-in-effect */
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  LayoutGrid,
  Settings,
  LogOut,
  ChevronDown,
  UserRoundPen,
  BadgeInfo,
  ReceiptText,
  GlobeLock,
  ListOrdered,
  Users,
  Layers,
  Dumbbell,
  BadgeCheck,
  Newspaper,
  Wallet,
  Ticket,
  MessageSquareQuote,
  MessageCircleQuestion,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { setAccessToken, setAdmin } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";

const NAV_ITEMS = [{ name: "Dashboard", icon: LayoutGrid, href: "/" }];

const MANAGEMENT_ITEMS = [
  { name: "User Management", icon: Users, href: "/management/users" },
  { name: "Admin Management", icon: GlobeLock, href: "/management/admins" },
  { name: "Trainer Management", icon: BadgeCheck, href: "/management/trainers" },
  { name: "Program Management", icon: Layers, href: "/management/programs" },
  { name: "Gym Management", icon: Dumbbell, href: "/management/gyms" },
  { name: "Newsfeed Moderation", icon: Newspaper, href: "/management/newsfeed" },
  { name: "Manage Subscription", icon: Wallet, href: "/management/subscriptions" },
  { name: "Manage Ticket", icon: Ticket, href: "/management/tickets" },
  { name: "Reviews", icon: MessageSquareQuote, href: "/management/reviews" },
];

const SETTINGS_SUB_ITEMS = [
  { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
  { name: "About", icon: BadgeInfo, href: "/settings/about" },
  { name: "Terms", icon: ReceiptText, href: "/settings/terms" },
  { name: "Disclaimers", icon: ListOrdered, href: "/settings/disclaimers" },
  { name: "Privacy", icon: GlobeLock, href: "/settings/privacy" },
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
const isManagementPath = section === "management";

const [isManagementOpen, setIsManagementOpen] = useState(true);
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
      className={`fixed top-0 left-0 z-40 h-screen bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col`}
    >
      <div className="h-20 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Layers className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Dr. Dina's
          </span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-149px)]">
        <nav className="grow space-y-3 p-4">
          {/* Dashboard */}
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                `w-full flex items-center justify-start p-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="mr-2 w-4 h-4" />
              {item.name}
            </NavLink>
          ))}

          {/* Management group */}
          <Collapsible open={isManagementOpen} onOpenChange={setIsManagementOpen}>
            <CollapsibleTrigger
              className={`w-full flex items-center justify-between p-2 rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isManagementPath
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <ListOrdered className="mr-2 h-4 w-4" />
                Management
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isManagementOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="py-2 space-y-2">
              {MANAGEMENT_ITEMS.map((item, index) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  className={({ isActive }) =>
                    `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "border-x-2 border-primary bg-primary/20"
                                    : "hover:bg-accent hover:text-accent-foreground"
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

          {/* Settings group */}
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger
              className={`w-full flex items-center justify-between p-2 rounded-lg text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isSettingsPath
                        ? "border-x-2 border-primary bg-primary/20"
                        : "hover:bg-accent hover:text-accent-foreground"
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
            <CollapsibleContent className="py-2 space-y-2">
              {SETTINGS_SUB_ITEMS.map((item, index) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                  className={({ isActive }) =>
                    `animate-fade-in-up w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-lg text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "border-x-2 border-primary bg-primary/20"
                                    : "hover:bg-accent hover:text-accent-foreground"
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
      <div className="border-t p-4">
        <Link to="/auth/login" className="block w-full text-center">
          <Button variant="outline" className="justify-start w-full">
            <LogOut />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
