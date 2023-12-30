"use client";
import React from "react";
import {
  NavigationMenuTrigger,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuContent,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Bookmark, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full py-4 gap-2">
      <div>
        <h1 className="text-lg">LaptopZone</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Filter</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <Button>Button</Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Input
        placeholder="Search"
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
    </nav>
  );
}
