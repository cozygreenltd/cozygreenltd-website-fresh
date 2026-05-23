import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type PropsWithChildren,
} from "react";

type LocationSnapshot = {
  pathname: string;
  search: string;
  hash: string;
};

const LocationContext = createContext<LocationSnapshot | null>(null);
let cachedLocationSnapshot: LocationSnapshot =
  typeof window === "undefined"
    ? { pathname: "/", search: "", hash: "" }
    : readLocation();

function readLocation(): LocationSnapshot {
  if (typeof window === "undefined") {
    return { pathname: "/", search: "", hash: "" };
  }

  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

function subscribe(callback: () => void) {
  const onPopState = () => {
    cachedLocationSnapshot = readLocation();
    callback();
  };

  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}

function getSnapshot() {
  return cachedLocationSnapshot;
}

export function NavigationProvider({ children }: PropsWithChildren) {
  const location = useSyncExternalStore(subscribe, getSnapshot, () => ({
    pathname: "/",
    search: "",
    hash: "",
  }));

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const location = useContext(LocationContext);
  if (location == null) {
    throw new Error("useLocation must be used within NavigationProvider");
  }
  return location;
}

export function usePathname() {
  return useLocation().pathname;
}

export function navigate(to: string) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", to);
  cachedLocationSnapshot = readLocation();
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function Link({
  to,
  onClick,
  href,
  children,
  ...props
}: PropsWithChildren<{ to?: string }> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  const resolvedHref = href ?? to ?? "#";

  return (
    <a
      href={resolvedHref}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey ||
          props.target === "_blank" ||
          resolvedHref.startsWith("http")
        ) {
          return;
        }

        if (to != null && resolvedHref.startsWith("/")) {
          event.preventDefault();
          navigate(to);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

export function useRouteEffect(onRouteChange: (location: LocationSnapshot) => void) {
  const location = useLocation();

  useEffect(() => {
    onRouteChange(location);
  }, [location, onRouteChange]);
}

export function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function useCurrentPath() {
  const location = useLocation();
  return useMemo(() => normalizePathname(location.pathname), [location.pathname]);
}
