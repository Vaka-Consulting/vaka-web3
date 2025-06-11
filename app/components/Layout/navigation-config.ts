import { LogIn, UserPlus } from "lucide-react";

// Parse environment variable for excluded services
const getExcludedServices = () => {
  try {
    const excludeConfig = process.env.NEXT_PUBLIC_EXCLUDE_SERVICE;
    return excludeConfig ? JSON.parse(excludeConfig) : {};
  } catch (error) {
    console.warn("Failed to parse NEXT_PUBLIC_EXCLUDE_SERVICE:", error);
    return {};
  }
};

// Define all possible navigation routes
const ALL_AUTH_ROUTES = {
  login_with_email: {
    id: "login_with_email",
    label: "Login With Email",
    path: "/login/email",
    icon: LogIn,
    type: "login",
  },
  login_with_wallet: {
    id: "login_with_wallet",
    label: "Login With Wallet",
    path: "/login/wallet",
    icon: LogIn,
    type: "login",
  },
  register: {
    id: "register",
    label: "Register",
    path: "/register",
    icon: UserPlus,
    type: "register",
  },
  // register_with_survey: {
  //   id: "register_with_survey",
  //   label: "Register w/ Survey",
  //   path: "/register/survey",
  //   icon: ClipboardList,
  //   type: "register",
  // },
};

// Profile routes (always available when authenticated)
const PROFILE_ROUTES = {
  profile: {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: null, // Will use User icon in component
    type: "profile",
  },
};

/**
 * Get filtered navigation routes based on environment configuration
 * @returns {Object} Filtered routes object
 */
export const getAuthRoutes = (): typeof ALL_AUTH_ROUTES => {
  const excludedServices = getExcludedServices();
  const filteredRoutes: Partial<typeof ALL_AUTH_ROUTES> = {};

  Object.entries(ALL_AUTH_ROUTES).forEach(([key, route]) => {
    const shouldExclude = excludedServices[route.id] === true;
    if (!shouldExclude) {
      filteredRoutes[key as keyof typeof ALL_AUTH_ROUTES] = route;
    }
  });

  // Return a type assertion to tell TypeScript we know what we're doing
  return filteredRoutes as typeof ALL_AUTH_ROUTES;
};

/**
 * Get profile routes (always available when authenticated)
 * @returns {Object} Profile routes object
 */
export const getProfileRoutes = () => {
  return PROFILE_ROUTES;
};

/**
 * Get routes by type (login, register, profile)
 * @param {string} type - Route type to filter by
 * @returns {Array} Array of routes matching the type
 */
export const getRoutesByType = (type: string) => {
  const authRoutes = getAuthRoutes();
  return Object.values(authRoutes).filter(
    (route): route is NonNullable<typeof route> =>
      route !== undefined && route.type === type
  );
};

/**
 * Check if a specific route is enabled
 * @param {string} routeId - ID of the route to check
 * @returns {boolean} Whether the route is enabled
 */
export const isRouteEnabled = (routeId: string) => {
  const excludedServices = getExcludedServices();
  return excludedServices[routeId] !== true;
};

/**
 * Get navigation configuration for different contexts
 * @returns {Object} Navigation configuration object
 */
export const getNavigationConfig = (): {
  authRoutes: typeof ALL_AUTH_ROUTES;
  profileRoutes: typeof PROFILE_ROUTES;
  loginRoutes: Array<(typeof ALL_AUTH_ROUTES)[keyof typeof ALL_AUTH_ROUTES]>;
  registerRoutes: Array<(typeof ALL_AUTH_ROUTES)[keyof typeof ALL_AUTH_ROUTES]>;
  hasAuthRoutes: boolean;
  hasLoginRoutes: boolean;
  hasRegisterRoutes: boolean;
} => {
  const authRoutes = getAuthRoutes();
  const profileRoutes = getProfileRoutes();

  return {
    // All available auth routes
    authRoutes,
    // Profile routes
    profileRoutes,
    // Login routes only
    loginRoutes: getRoutesByType("login"),
    // Register routes only
    registerRoutes: getRoutesByType("register"),
    // Check if any auth routes are available
    hasAuthRoutes: Object.keys(authRoutes).length > 0,
    // Check if specific route types are available
    hasLoginRoutes: getRoutesByType("login").length > 0,
    hasRegisterRoutes: getRoutesByType("register").length > 0,
  };
};

// Default export for convenience
export default {
  getAuthRoutes,
  getProfileRoutes,
  getRoutesByType,
  isRouteEnabled,
  getNavigationConfig,
  ALL_AUTH_ROUTES,
  PROFILE_ROUTES,
};
