import { UserCircle, LogOut, User, Shield, Briefcase, Mail, IdCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProfileDropdownProps {
  onLogout: () => void;
}

const ROLE_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  admin: { label: "Administrator", icon: Shield, color: "text-primary" },
  user: { label: "User", icon: User, color: "text-accent-foreground" },
  trader: { label: "Trader", icon: Briefcase, color: "text-primary" },
};

export default function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  const name = localStorage.getItem("user_name") || "Unknown";
  const role = localStorage.getItem("user_role") || "user";
  const email = localStorage.getItem("user_email") || "—";
  const traderId = localStorage.getItem("trader_id");

  const meta = ROLE_META[role] || ROLE_META.user;
  const RoleIcon = meta.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <RoleIcon className={`w-5 h-5 ${meta.color}`} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate">{name}</p>
            <p className="text-xs text-muted-foreground font-normal">{meta.label}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal pb-0">Account Info</DropdownMenuLabel>

        <div className="px-2 py-1.5 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Role: {meta.label}</span>
          </div>
          {traderId && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Trader ID: {traderId}</span>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
