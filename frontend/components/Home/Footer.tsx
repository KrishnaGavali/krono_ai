import { Calendar } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    title: "Krono AI",
    url: "#",
  },
  tagline = "Voice-first time management for modern professionals",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#features" },
        { text: "Demo", url: "#demo" },
        { text: "Pricing", url: "#pricing" },
      ],
    },

    {
      title: "Connect",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "GitHub", url: "#" },
      ],
    },
  ],
  copyright = "© 2025 Krono AI. All rights reserved.",
  bottomLinks = [],
}: FooterProps) => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            {/* Logo and description */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <a
                  href={logo.url}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Calendar className="size-8 text-primary" />
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {logo.title}
                  </span>
                </a>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                {tagline}
              </p>
            </div>

            {/* Footer links */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-1">
                <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{copyright}</p>

            <div className="flex items-center gap-6">
              {bottomLinks.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.url}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
