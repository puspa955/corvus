import { clerkMiddleware } from "@clerk/nextjs/server";

// Define your middleware
const middleware = clerkMiddleware();

// Export the middleware
export default middleware;

// Define additional configuration if needed
export const config = {
  // Define your matcher patterns
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
