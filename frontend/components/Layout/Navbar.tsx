import {
  Calendar,
  Menu,
  DollarSign,
  Play,
  User,
  ChevronDown,
} from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    alt: "Krono AI Logo",
    title: "Krono AI",
  },
  menu = [
    { title: "Home", url: "#" },
    { title: "Demo", url: "#demo" },
    { title: "Pricing", url: "#pricing" },
    { title: "About Dev", url: "#about" },
  ],
  auth = {
    signup: {
      title: "Get Started",
      loginUrl: "#login-google",
      signupUrl: "#signup-google",
    },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4 flex items-center justify-center bg-background/80 backdrop-blur-md border-b border-border/50 fixed w-full top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Desktop Menu */}
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
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  {auth.signup.title}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <a
                    href={auth.signup.loginUrl}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <GoogleIcon className="h-4 w-4" />
                    Login with Google
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={auth.signup.signupUrl}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <GoogleIcon className="h-4 w-4" />
                    Get Started with Google
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden px-5">
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
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <a
                        href={logo.url}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <Calendar className="size-8 text-primary" />
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {logo.title}
                        </span>
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full justify-center">
                            {auth.signup.title}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-56">
                          <DropdownMenuItem asChild>
                            <a
                              href={auth.signup.loginUrl}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <GoogleIcon className="h-4 w-4" />
                              Login with Google
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a
                              href={auth.signup.signupUrl}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <GoogleIcon className="h-4 w-4" />
                              Get Started with Google
                            </a>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    console.log("Item :", item.items);
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
        className="bg-background hover:bg-accent-foreground hover:text-accent group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
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
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
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
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
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
