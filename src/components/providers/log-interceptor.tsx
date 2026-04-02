"use client";

import { useEffect } from "react";
import { useLoggerStore } from "@/lib/logger-store";
import { usePathname } from "next/navigation";

export default function GlobalLogInterceptor() {
  const { logError, logWarning } = useLoggerStore();
  const pathname = usePathname();

  useEffect(() => {
    // Intercept window errors
    const handleError = (event: ErrorEvent) => {
      logError(
        event.message,
        "Client",
        `File: ${event.filename}, Line: ${event.lineno}`,
        500
      );
    };

    // Intercept unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logError(
        `Unhandled Promise Rejection: ${event.reason}`,
        "Client",
        "An asynchronous operation failed without a catch block.",
        500
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, [logError]);

  return null; // This component does not render anything
}
