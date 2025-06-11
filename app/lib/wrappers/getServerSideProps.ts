import { GetServerSideProps, GetServerSidePropsContext } from "next";

const SERVICE_PAGE_MAPPER: Record<string, string[]> = {
  register: ["/register", "/register/verify", "/register/verify/[code]"],
  login_with_email: ["/login/email"],
  login_with_wallet: ["/login/wallet"],
};

export default function getServerSidePropsWrapper(
  getServerSideProps: GetServerSideProps
): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    const currentPath = context.resolvedUrl;

    console.log("Current Path:", currentPath);

    let excludedServices: Record<string, boolean> = {};
    try {
      excludedServices = JSON.parse(
        process.env.NEXT_PUBLIC_EXCLUDE_SERVICE || "{}"
      );
    } catch (error) {
      console.error("Invalid EXCLUDE_SERVICE config:", error);
    }

    console.log("Excluded Services:", excludedServices);

    for (const [service, paths] of Object.entries(SERVICE_PAGE_MAPPER)) {
      if (
        excludedServices[service] === true &&
        paths.some((p) => matchPath(p, currentPath))
      ) {
        console.log("Service excluded:", service);
        return {
          notFound: true,
        };
      }
    }

    return getServerSideProps(context);
  };
}

// Simple path matcher (can be enhanced to support dynamic segments)
function matchPath(pattern: string, path: string): boolean {
  // Replace [param] with a wildcard matcher
  const regex = new RegExp(
    "^" +
      pattern
        .replace(/\[.*?\]/g, "[^/]+") // match dynamic parts like [code]
        .replace(/\//g, "\\/") +
      "$"
  );
  return regex.test(path);
}
