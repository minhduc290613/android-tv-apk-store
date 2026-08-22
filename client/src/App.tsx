/**
 * Phòng chiếu số: lớp ứng dụng duy trì nền tối ấm và trải nghiệm tập trung cho TV.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function getRouterBase() {
  if (typeof window === "undefined" || !window.location.hostname.endsWith(".github.io")) return "";
  const [repositoryName] = window.location.pathname.split("/").filter(Boolean);
  return repositoryName ? `/${repositoryName}` : "";
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const routerBase = getRouterBase();
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" position="bottom-right" />
          <Router base={routerBase}>
            <AppRouter />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
