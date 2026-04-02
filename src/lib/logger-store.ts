import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type LogLevel = "INFO" | "WARNING" | "ERROR" | "DEBUG";
export type LogSource = "Auth" | "API" | "Database" | "Payment" | "System" | "Client";

export interface SystemLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  message: string;
  details?: string;
  statusCode?: number;
  userId?: string;
  ip?: string;
}

interface LoggerState {
  logs: SystemLog[];
  logInfo: (message: string, source?: LogSource, details?: string, userId?: string) => void;
  logWarning: (message: string, source?: LogSource, details?: string) => void;
  logError: (message: string, source?: LogSource, details?: string, statusCode?: number) => void;
  logDebug: (message: string, source?: LogSource, details?: string) => void;
  addLog: (log: Omit<SystemLog, "id" | "timestamp">) => void;
  clearLogs: () => void;
}

export const useLoggerStore = create<LoggerState>()(
  persist(
    (set) => ({
      logs: [],
      addLog: (log) =>
        set((state) => ({
          logs: [
            {
              ...log,
              id: `LOG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
              timestamp: new Date().toISOString(),
            },
            ...state.logs,
          ].slice(0, 1000), // Keep last 1000 logs
        })),
      logInfo: (message, source = "System", details, userId) =>
        set((state) => ({
          logs: [{ id: `LOG-${uuidv4().substring(0, 8).toUpperCase()}`, timestamp: new Date().toISOString(), level: "INFO" as LogLevel, source, message, details, userId }, ...state.logs].slice(0, 1000),
        })),
      logWarning: (message, source = "System", details) =>
        set((state) => ({
          logs: [{ id: `LOG-${uuidv4().substring(0, 8).toUpperCase()}`, timestamp: new Date().toISOString(), level: "WARNING" as LogLevel, source, message, details }, ...state.logs].slice(0, 1000),
        })),
      logError: (message, source = "System", details, statusCode) =>
        set((state) => ({
          logs: [{ id: `LOG-${uuidv4().substring(0, 8).toUpperCase()}`, timestamp: new Date().toISOString(), level: "ERROR" as LogLevel, source, message, details, statusCode }, ...state.logs].slice(0, 1000),
        })),
      logDebug: (message, source = "System", details) =>
        set((state) => ({
          logs: [{ id: `LOG-${uuidv4().substring(0, 8).toUpperCase()}`, timestamp: new Date().toISOString(), level: "DEBUG" as LogLevel, source, message, details }, ...state.logs].slice(0, 1000),
        })),
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: "system-logs-storage",
    }
  )
);
