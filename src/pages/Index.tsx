import { useState, useEffect } from "react";
import { initDemoUser, isLoggedIn } from "@/lib/banking";
import LoginPanel from "@/components/LoginPanel";
import Dashboard from "@/components/Dashboard";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initDemoUser();
    setLoggedIn(isLoggedIn());
  }, []);

  if (!loggedIn) {
    return <LoginPanel onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
