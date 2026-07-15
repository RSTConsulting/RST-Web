import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/Header";
import { SiteFooter } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container-wide flex flex-1 items-center py-32">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-5xl md:text-6xl font-semibold text-navy">Page not found.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-10 inline-block bg-navy-surface text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-steel transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md">
        <p className="eyebrow mb-3">Error</p>
        <h1 className="text-3xl font-semibold text-navy">This page didn't load.</h1>
        <p className="mt-3 text-muted-foreground">
          Something went wrong. Try refreshing or return home.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-navy-surface text-white px-5 py-2.5 text-sm hover:bg-steel transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-navy text-navy px-5 py-2.5 text-sm hover:bg-navy hover:text-white transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RST Consulting Engineers - Structural & Civil Design, Melbourne" },
      {
        name: "description",
        content:
          "RST Consulting Engineers - structural and civil engineering design for residential, commercial, industrial and institutional projects across Melbourne. Based in Springvale, Victoria.",
      },
      { property: "og:title", content: "RST Consulting Engineers" },
      {
        property: "og:description",
        content:
          "Structural and civil engineering design for residential, commercial, industrial and institutional projects across Melbourne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RST Consulting Engineers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
