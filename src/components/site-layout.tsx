import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/chat-widget";
import { Toaster } from "@/components/ui/sonner";
import { Link, usePathname } from "@/lib/navigation";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const FOOTER_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/process", label: "Process" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const glassyHeader = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          glassyHeader
            ? "bg-background/70 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <Link
            to="/"
            className={`flex items-center gap-3 font-semibold text-3xl transition-colors ${
              glassyHeader
                ? "text-foreground"
                : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]"
            }`}
          >
            <img
              src="/logo.jpg"
              alt="Cozy Green Landscaping logo"
              className="h-12 w-12 rounded-full object-cover bg-white shadow-sm"
            />
            <span>Cozy Green</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-2 text-lg">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-md text-lg font-semibold transition-colors ${
                    glassyHeader
                      ? active
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                      : active
                        ? "text-accent"
                        : "text-white/90 hover:text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <Button asChild className="h-12 px-6 text-lg">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] hover:bg-white/10"
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-background/95 backdrop-blur border-t border-border"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-3 py-2 rounded-md text-lg font-semibold hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
                <Button asChild className="mt-2">
                  <Link to="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 pt-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/15551234567"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a
          href="tel:+15551234567"
          aria-label="Call Now"
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg hover:scale-105 transition-transform"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      <ChatWidget />
      <Toaster richColors position="top-center" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg mb-3">
            <img
              src="/logo.jpg"
              alt="Cozy Green Landscaping logo"
              className="h-8 w-8 rounded-full object-cover bg-white"
            />
            Cozy Green Landscaping
          </div>
          <p className="text-sm opacity-80">
            Premium landscaping services that transform your outdoor space into something beautiful.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {FOOTER_NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li>(555) 123-4567</li>
            <li>hello@cozygreen.com</li>
            <li>Mon–Sat · 8am – 6pm</li>
            <li>Serving the greater metro area</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm opacity-80 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Cozy Green Landscaping. All rights reserved.</span>
          <span>Licensed & Insured</span>
        </div>
      </div>
    </footer>
  );
}
