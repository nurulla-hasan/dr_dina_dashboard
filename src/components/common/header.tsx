import { Bell, Moon, Sun, Menu, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/theme/theme-provider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useSelector } from "react-redux";
// import { useGetAdminProfileQuery } from "@/redux/feature/auth/authApi";
import { getInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_ADMIN = {
  name: "Golap Hasan",
  email: "admin@gmail.com",
  profile_image: "https://i.pravatar.cc/150?img=54",
};

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { setTheme, theme } = useTheme();
  // const storedAdmin = useSelector((state) => state.auth.admin);
  const admin = FALLBACK_ADMIN;
  // const { isLoading } = useGetAdminProfileQuery();
  const isLoading = false;

  const handleLogout = () => {
    window.location.href = "auth/login";
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 bg-primary text-primary-foreground z-30 border-b border-primary/20">
      <div className="relative h-full flex items-center justify-between px-4">
        {/* Left side: mobile menu or spacer */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            onClick={onMenuClick}
          >
            <Menu />
          </Button>
          <h1 className="text-xl md:text-2xl font-normal text-primary-foreground">Welcome back!</h1>
        </div>

        {/* Right: notification + theme toggle + profile */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Notification icon */}
          <Link to="/notifications">
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full text-primary dark:text-primary-foreground"
            >
              <Bell />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-primary"></span>
            </Button>
          </Link>

          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full hidden lg:flex text-primary dark:text-primary-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </Button>

          <div className="flex items-center pl-2">
            {/* Profile dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-28 rounded-sm hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                        <AvatarImage
                          src={admin?.profile_image}
                          alt={admin?.name || "user"}
                        />
                        <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                          {getInitials(admin?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="md:flex flex-col hidden text-primary-foreground">
                        <span
                          className="text-sm font-semibold leading-none"
                          title={admin?.name || "user"}
                        >
                          {admin?.name || "user"}
                        </span>
                        <span className="text-[10px] text-primary-foreground/80">
                          Admin
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2">
                {isLoading ? (
                  <div className="p-2 min-w-50">
                    <Skeleton className="h-4 w-28 rounded mb-2" />
                    <Skeleton className="h-3 w-40 rounded" />
                  </div>
                ) : (
                  <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                      {admin?.name || "user"}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                      {admin?.email || ""}
                    </span>
                  </DropdownMenuLabel>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/settings/profile" className="w-full flex items-center">
                      <Avatar className="h-4 w-4 mr-2">
                        <AvatarImage src={admin?.profile_image} />
                        <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                      </Avatar>
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/notifications"
                      className="w-full flex items-center"
                    >
                      <Bell
                        size={16}
                        className="opacity-60 mr-2"
                        aria-hidden="true"
                      />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun size={16} className="opacity-60 mr-2" />
                    ) : (
                      <Moon size={16} className="opacity-60 mr-2" />
                    )}
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon
                    size={16}
                    className="opacity-60 mr-2"
                    aria-hidden="true"
                  />
                  <span>logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
