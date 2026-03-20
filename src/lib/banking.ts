// Demo user credentials
const DEMO_USER = {
  email: "admin@bank.com",
  password: "bank1234",
  name: "Alex Morgan",
};

const KNOWN_DEVICE_ID = "DEVICE-XK7-2024";

// Trader database
export const TRADERS: Record<string, { name: string; verified: boolean }> = {
  T1: { name: "Global Payments Corp", verified: true },
  T2: { name: "QuickCash Ltd", verified: false },
  T3: { name: "SecureTrade Inc", verified: true },
  T4: { name: "OffshoreX Partners", verified: false },
  T5: { name: "National Bank Services", verified: true },
};

export type RiskLevel = "low" | "medium" | "high";

export interface RiskResult {
  level: RiskLevel;
  score: number;
  factors: string[];
}

export function initDemoUser() {
  if (!localStorage.getItem("demo_user")) {
    localStorage.setItem("demo_user", JSON.stringify(DEMO_USER));
  }
  if (!localStorage.getItem("device_id")) {
    localStorage.setItem("device_id", KNOWN_DEVICE_ID);
  }
}

export function login(email: string, password: string, deviceId: string): { success: boolean; message: string } {
  const stored = JSON.parse(localStorage.getItem("demo_user") || "{}");

  if (email !== stored.email || password !== stored.password) {
    return { success: false, message: "Invalid email or password." };
  }

  const knownDevice = localStorage.getItem("device_id");
  if (deviceId !== knownDevice) {
    return { success: false, message: "⚠ Unrecognized device detected! Login blocked for security." };
  }

  localStorage.setItem("logged_in", "true");
  return { success: true, message: `Welcome back, ${stored.name}!` };
}

export function logout() {
  localStorage.removeItem("logged_in");
}

export function isLoggedIn(): boolean {
  return localStorage.getItem("logged_in") === "true";
}

export function checkTrader(traderId: string): { found: boolean; verified: boolean; name: string } {
  const id = traderId.toUpperCase();
  const trader = TRADERS[id];
  if (!trader) return { found: false, verified: false, name: "" };
  return { found: true, verified: trader.verified, name: trader.name };
}

export function calculateRisk(amount: number, traderId: string): RiskResult {
  let score = 0;
  const factors: string[] = [];

  const trader = checkTrader(traderId);

  if (!trader.found) {
    score += 40;
    factors.push("Unknown trader ID");
  } else if (!trader.verified) {
    score += 35;
    factors.push("Unverified trader");
  }

  if (amount > 10000) {
    score += 30;
    factors.push("Very high transaction amount (>$10,000)");
  } else if (amount > 5000) {
    score += 20;
    factors.push("High transaction amount (>$5,000)");
  } else if (amount > 2000) {
    score += 10;
    factors.push("Moderate transaction amount (>$2,000)");
  }

  if (amount > 5000 && !trader.verified) {
    score += 15;
    factors.push("High amount to unverified trader");
  }

  const level: RiskLevel = score >= 50 ? "high" : score >= 25 ? "medium" : "low";
  return { level, score: Math.min(score, 100), factors };
}

export function sendMoney(amount: number, traderId: string): { success: boolean; message: string; risk: RiskResult } {
  const risk = calculateRisk(amount, traderId);

  if (risk.level === "high") {
    return { success: false, message: "🚫 Transaction BLOCKED — Risk level too high.", risk };
  }

  if (risk.level === "medium") {
    return { success: true, message: "⚠ Transaction processed with WARNING. Manual review recommended.", risk };
  }

  return { success: true, message: "✅ Transaction processed successfully.", risk };
}
