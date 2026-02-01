import { Link, useLocation } from "wouter";
import { Rocket, GraduationCap, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Study<span className="text-primary">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/resources">
            <Button variant="ghost" className={location === '/resources' ? 'text-primary bg-primary/5' : 'text-muted-foreground'}>
              Browse All
            </Button>
          </Link>
          <Link href="/add">
            <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity shadow-md shadow-primary/25">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
