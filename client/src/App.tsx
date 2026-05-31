import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Navigation from "@/components/Navigation";
import WelcomeScreen from "@/components/PasswordLock";

import FallingPetals from "@/components/FallingPetals";
import BackgroundHearts from "@/components/BackgroundHearts";
import RosePetals from "@/components/RosePetals";
import InteractiveHearts from "@/components/InteractiveHearts";
import WelcomeModal from "@/components/WelcomeModal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const entered = sessionStorage.getItem("hasEntered") === "true";
    setHasEntered(entered);
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  if (!hasEntered) {
    return (
      <WelcomeScreen
        onEnter={() => {
          sessionStorage.setItem("hasEntered", "true");
          setHasEntered(true);
        }}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen">
          <BackgroundHearts />
          <FallingPetals />
          <RosePetals />
          <InteractiveHearts />
          <Navigation />
          <Router />
          <WelcomeModal />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
