import { SVGStudioLogo } from "@/components/svg-illustrations";

const footerLinks = {
  Product: [
    { label: "Styles", href: "#styles" },
    { label: "Generator", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  Resources: [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1160px] mx-auto px-5 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <SVGStudioLogo className="w-6 h-6 text-primary" />
              <span className="text-[14px] font-semibold text-foreground">
                SVG Studio
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[220px]">
              AI-powered SVG generation for consistent design systems.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-semibold text-foreground mb-3 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6">
          <p className="text-[12px] text-muted-foreground">
            &copy; {new Date().getFullYear()} SVG Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
