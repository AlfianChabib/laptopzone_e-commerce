"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Bookmark, ShoppingCart } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { NavbarProps } from "@/types/frontend/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
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

export default function Navbar(props: NavbarProps) {
  const { dataUser } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (dataUser !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [dataUser]);

  function handleLogOut() {
    setLoading(true);
    signOut();
    setLoading(false);
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
              <Link href="/auth/signin">
                <Button variant={"outline"}>Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <NavigationMenu>
            <NavigationMenuList>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex">
                  <Button variant="secondary" className="h-12">
                    <Avatar>
                      <AvatarImage
                        src={String(dataUser?.picture)}
                        alt={dataUser?.name}
                        width={32}
                        height={32}
                      />
                      <AvatarFallback className="bg-slate-900">
                        LZ
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2">{dataUser?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Transaction</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </nav>
  );
}
