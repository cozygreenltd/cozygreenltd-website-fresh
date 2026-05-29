// Chooses the page component for the current pathname and wraps it in the shared layout.
import { SiteLayout } from "@/components/site-layout";
import { useCurrentPath } from "@/lib/navigation";
import { AboutPage } from "@/routes/about";
import { ContactPage } from "@/routes/contact";
import { FAQPage } from "@/routes/faq";
import { HomePage } from "@/routes/index";
import { ProcessPage } from "@/routes/process";
import { ProjectsPage } from "@/routes/projects";
import { ServicesPage } from "@/routes/services";
import { TestimonialsPage } from "@/routes/testimonials";

function NotFoundPage() {
  // Fallback screen for any route that is not mapped above.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
    </div>
  );
}

export function App() {
  // Resolve the current route once so the app can swap page content without a router library.
  const pathname = useCurrentPath();

  let content = <NotFoundPage />;
  if (pathname === "/") content = <HomePage />;
  else if (pathname === "/about") content = <AboutPage />;
  else if (pathname === "/services") content = <ServicesPage />;
  else if (pathname === "/projects") content = <ProjectsPage />;
  else if (pathname === "/process") content = <ProcessPage />;
  else if (pathname === "/testimonials") content = <TestimonialsPage />;
  else if (pathname === "/faq") content = <FAQPage />;
  else if (pathname === "/contact") content = <ContactPage />;

  return <SiteLayout>{content}</SiteLayout>;
}
