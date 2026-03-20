import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkTrader } from "@/lib/banking";
import { UserCheck, Search } from "lucide-react";

export default function TraderCheckPanel() {
  const [traderId, setTraderId] = useState("");
  const [result, setResult] = useState<{ found: boolean; verified: boolean; name: string } | null>(null);

  const handleCheck = () => {
    if (!traderId.trim()) return;
    setResult(checkTrader(traderId));
  };

  return (
    <Card className="animate-fade-in shadow-lg border-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Trader Verification</CardTitle>
            <CardDescription>Check if a trader is verified and safe</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="trader-id" className="sr-only">Trader ID</Label>
            <Input
              id="trader-id"
              placeholder="Enter Trader ID (e.g. T1, T2)"
              value={traderId}
              onChange={e => setTraderId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCheck()}
              className="font-mono"
            />
          </div>
          <Button onClick={handleCheck} className="gap-2">
            <Search className="h-4 w-4" /> Check
          </Button>
        </div>

        {result && (
          <div className={`p-4 rounded-xl animate-fade-in ${
            !result.found
              ? "bg-danger/10 border border-danger/20"
              : result.verified
                ? "bg-success/10 border border-success/20"
                : "bg-warning/10 border border-warning/20"
          }`}>
            {!result.found ? (
              <p className="font-semibold text-danger">❌ Trader not found in the system.</p>
            ) : result.verified ? (
              <div>
                <p className="font-semibold text-success">✅ Verified Trader — Safe</p>
                <p className="text-sm text-muted-foreground mt-1">{result.name}</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-warning">⚠ Not Verified — High Risk</p>
                <p className="text-sm text-muted-foreground mt-1">{result.name}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
