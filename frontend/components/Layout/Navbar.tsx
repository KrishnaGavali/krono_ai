"use client";
import { Calendar, Menu, LogOut } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { GoogleIcon } from "@/components/ui/google-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    signup: {
      title: string;
      loginUrl: string;
      signupUrl: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "",
    alt: "TimelyAI Logo",
    title: "TimelyAI",
  },
  menu = [
    { title: "Home", url: "#" },
    { title: "Demo", url: "#demo" },
    { title: "Pricing", url: "#pricing" },
    { title: "About Dev", url: "#about" },
  ],
}: Navbar1Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuth, user, logout } = useAuth();

  console.log("User in Navbar:", user?.profilePic);

  const handleLogin = () => {
    // Redirect to Google OAuth login
    window.location.href =
      "https://69196730003ac7b39c9f.fra.appwrite.run/auth/google";
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const nonAllowedRoutes = ["/auth/callback"];

  if (nonAllowedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <section className="py-4 flex items-center justify-center bg-background/80 backdrop-blur-md border-b border-border fixed w-full top-0 z-50 supports-[backdrop-filter]:bg-background/60 h-20">
      <div className="container">
        {/* Desktop Navbar */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a
              href={logo.url}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Calendar className="size-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Theme + Auth */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            {isAuth && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-sm font-medium">{user.name}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePic} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="bg-destructive text-white hover:bg-destructive/90 focus:bg-destructive/90"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-white" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant={"default"}>
                <div
                  className=" flex items-center hover:cursor-pointer"
                  onClick={handleLogin}
                >
                  <GoogleIcon className="h-4 w-4 mr-2" />
                  Login with Google
                </div>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="block lg:hidden px-5 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href={logo.url}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Calendar className="size-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">
                {logo.title}
              </span>
            </a>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="size-4" />
              </Button>
            </div>
          </div>

          {/* Dropdown Menu (Top-down) */}
          {isMobileMenuOpen && (
            <div className="absolute left-0 right-0 mt-5.5 bg-background border border-border shadow-lg rounded-b-md p-4 flex flex-col gap-6 z-40">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                {isAuth && user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profilePic} alt={user.name} />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant={"destructive"}
                      onClick={handleLogout}
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant={"default"}>
                    <div
                      className=" flex items-center hover:cursor-pointer"
                      onClick={handleLogin}
                    >
                      <GoogleIcon className="h-4 w-4 mr-2" />
                      Login with Google
                    </div>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ====== RENDER FUNCTIONS ======

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="hover:text-primary flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm ">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
