import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { initDemoUser } from "@/lib/banking";
import { generateDeviceId, getDeviceInfo } from "@/lib/deviceId";
import { Shield, LogIn, Fingerprint, ArrowLeft, Monitor, Globe, Maximize } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ADMIN_DEVICE_ID_KEY = "admin_device_id";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@bank.com");
  const [password, setPassword] = useState("bank1234");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const currentDeviceId = generateDeviceId();
  const deviceInfo = getDeviceInfo();

  useEffect(() => {
    initDemoUser();
    // Register admin device on first visit
    if (!localStorage.getItem(ADMIN_DEVICE_ID_KEY)) {
      localStorage.setItem(ADMIN_DEVICE_ID_KEY, currentDeviceId);
    }
  }, []);

  const handleLogin = () => {
    const stored = JSON.parse(localStorage.getItem("demo_user") || "{}");

    if (email !== stored.email || password !== stored.password) {
      setMessage({ text: "Invalid email or password.", type: "error" });
      return;
    }

    const registeredDeviceId = localStorage.getItem(ADMIN_DEVICE_ID_KEY);
    if (currentDeviceId !== registeredDeviceId) {
      setMessage({ text: "⚠ Unrecognized device detected! Login blocked for security.", type: "error" });
      return;
    }

    localStorage.setItem("logged_in", "true");
    localStorage.setItem("user_role", "admin");
    localStorage.setItem("user_name", "Alex Morgan");
    localStorage.setItem("user_email", email);
    setMessage({ text: "Welcome back, Alex Morgan!", type: "success" });
    setTimeout(() => navigate("/admin-dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-fade-in shadow-xl border-primary/10">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Sign in with admin credentials to access the full dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <LogIn className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {/* Device Info - Auto-detected, read-only */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Fingerprint className="w-4 h-4" />
                Current Device ID
              </div>
              <p className="font-mono text-sm font-bold text-foreground tracking-wider">{currentDeviceId}</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {deviceInfo.os}</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {deviceInfo.browser}</span>
                <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> {deviceInfo.screen}</span>
                <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> {deviceInfo.platform}</span>
              </div>
              <p className="text-xs text-muted-foreground">Must match the registered admin device.</p>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm font-medium animate-fade-in ${
                message.type === "success" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
              }`}>
                {message.text}
              </div>
            )}

            <Button onClick={handleLogin} className="w-full" size="lg">Sign In as Admin</Button>

            <p className="text-xs text-center text-muted-foreground">
              Demo: admin@bank.com / bank1234
            </p>

            <div className="flex items-center justify-center gap-4 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Home
              </Link>
              <Link to="/user-login" className="text-primary hover:underline">
                User Login →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
