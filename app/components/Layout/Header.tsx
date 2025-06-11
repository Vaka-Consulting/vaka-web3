import { useState } from "react";
import { NextLinkComposed } from "@/components/Layout/Link";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, LogOut, Menu, Shield } from "lucide-react";
import { getNavigationConfig } from "@/components/Layout/navigation-config";

function ProfileMenu() {
  const { logout } = useAuth();
  const { profileRoutes } = getNavigationConfig();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-colors">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 shadow-lg border border-border/50 backdrop-blur-sm"
        align="end">
        {Object.values(profileRoutes).map((route) => (
          <DropdownMenuItem
            key={route.id}
            asChild
            className="cursor-pointer hover:bg-accent/50 transition-colors">
            <NextLinkComposed
              to={route.path}
              className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{route.label}</span>
            </NextLinkComposed>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors">
          <LogOut className="h-4 w-4 mr-3" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthMenu() {
  const { authRoutes, hasAuthRoutes } = getNavigationConfig();

  // Don't render if no auth routes are available
  if (!hasAuthRoutes) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
          <Shield className="h-4 w-4 mr-2" />
          Authentication
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 shadow-lg border border-border/50 backdrop-blur-sm"
        align="end">
        {Object.values(authRoutes).map((route) => (
          <DropdownMenuItem
            key={route.id}
            asChild
            className="cursor-pointer hover:bg-accent/50 transition-colors">
            <NextLinkComposed
              to={route.path}
              className="flex items-center gap-3">
              <route.icon className="h-4 w-4 text-muted-foreground" />
              <span>{route.label}</span>
            </NextLinkComposed>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileAuthMenu() {
  const [open, setOpen] = useState(false);
  const { authRoutes, hasAuthRoutes } = getNavigationConfig();

  // Don't render if no auth routes are available
  if (!hasAuthRoutes) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 transition-colors">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 bg-background/95 backdrop-blur-md border-l border-border/50">
        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Authentication
          </h2>
          {Object.values(authRoutes).map((route) => (
            <Button
              key={route.id}
              asChild
              variant="outline"
              className="justify-start gap-3 h-12"
              onClick={() => setOpen(false)}>
              <NextLinkComposed to={route.path}>
                <route.icon className="h-4 w-4" />
                {route.label}
              </NextLinkComposed>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileProfileMenu() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { profileRoutes } = getNavigationConfig();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-colors">
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 bg-background/95 backdrop-blur-md border-l border-border/50">
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Profile</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account
              </p>
            </div>
          </div>
          {Object.values(profileRoutes).map((route) => (
            <Button
              key={route.id}
              asChild
              variant="outline"
              className="justify-start gap-3 h-12"
              onClick={() => setOpen(false)}>
              <NextLinkComposed to={route.path}>
                <User className="h-4 w-4" />
                {route.label}
              </NextLinkComposed>
            </Button>
          ))}
          <Button
            variant="destructive"
            className="justify-start gap-3 h-12 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
            onClick={() => {
              logout();
              setOpen(false);
            }}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const { authenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <NextLinkComposed
            to="/"
            className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Web3 Auth
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Demo Application
              </p>
            </div>
          </NextLinkComposed>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {authenticated ? <ProfileMenu /> : <AuthMenu />}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center">
            {authenticated ? <MobileProfileMenu /> : <MobileAuthMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}
