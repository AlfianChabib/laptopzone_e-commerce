"use client";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Bookmark, ShoppingCart } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { loginStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const { userAccess, setUserAcces } = loginStore();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userAccess) {
      setIsLogin(true);
    }
  }, [userAccess]);

  const authPathName = ["/auth/sign-in", "/auth/sign-up"];

  if (authPathName.includes(pathName)) {
    return null;
  }

  function handleLogOut() {
    setLoading(true);
    setUserAcces("");
    router.push("/auth/sign-in");
  }
  return (
    <nav className="flex sticky top-0 left-0 z-50 bg-slate-950 backdrop-filter backdrop-blur-sm bg-opacity-30 items-center justify-between w-full py-4 gap-2">
      <div className="md:flex hidden">
        <h1 className="text-lg">LaptopZone</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Name</DropdownMenuItem>
              <DropdownMenuItem>Price</DropdownMenuItem>
              <DropdownMenuItem>Brand</DropdownMenuItem>
              <DropdownMenuItem>Recent Update</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuList>
      </NavigationMenu>
      <Input
        placeholder="Search in LaptopZone"
        type="search"
        className="focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-slate-700"
      />
      <Separator orientation="vertical" className="h-7" decorative />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button variant="outline" className="relative">
              <Badge className="absolute leading-6 px-1 h-4 -right-1 -top-2">
                11
              </Badge>
              <Bookmark />
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="outline" className="relative">
              <Badge className="absolute leading-6 px-1 h-4 -right-1 -top-2">
                11
              </Badge>
              <ShoppingCart />
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Separator orientation="vertical" className="h-7" decorative />
      <div className="md:flex hidden items-center ">
        {!isLogin ? (
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <Link href="/auth/sign-in">
                <Button variant={"outline"}>Sign In</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Button variant={"outline"} onClick={handleLogOut} disabled={loading}>
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
}
