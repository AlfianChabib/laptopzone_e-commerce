"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  Package,
  PackagePlus,
  ShoppingCart,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="lg:flex hidden flex-col p-4 overflow-hidden w-[500px] border rounded-md justify-between">
      <div className="flex flex-col gap-4 w-full">
        <Card className="overflow-hidden">
          <div className="flex gap-4 p-2">
            <Avatar className="w-16 h-16 items-center justify-center border">
              <AvatarImage src="https://avatars.githubusercontent.com/u/108635592?v=4" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap-1">
              <CardTitle>Alfian Chabib</CardTitle>
              <CardDescription>
                <span>@</span>alfianchabib
              </CardDescription>
            </div>
          </div>
          <Separator />
          <div className="flex gap-4 p-2 items-center justify-center">
            <CardDescription>
              Product : <span>0</span>
            </CardDescription>
            <Separator orientation="vertical" className="h-6" />
            <CardDescription>
              Cart : <span>0</span>
            </CardDescription>
            <Separator orientation="vertical" className="h-6" />
            <CardDescription>
              Wishlist : <span>0</span>
            </CardDescription>
          </div>
        </Card>
        <div className="flex items-center justify-center border rounded-md">
          <div defaultValue="profile" className="w-full p-1">
            <TabsList className="flex-col w-full h-full gap-2">
              <TabsTrigger className="w-full justify-between" value="profile">
                <p>Profile</p>
                <User size={18} />
              </TabsTrigger>
              <Separator />
              <TabsTrigger className="w-full justify-between" value="products">
                <p>Products</p>
                <Package size={18} />
              </TabsTrigger>
              <Separator />
              <TabsTrigger className="w-full justify-between" value="carts">
                <p>Carts</p>
                <ShoppingCart size={18} />
              </TabsTrigger>
              <Separator />
              <TabsTrigger className="w-full justify-between" value="wishlists">
                <p>Wishlists</p>
                <Bookmark size={18} />
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>
      <TabsList className="flex flex-col w-full h-20 border">
        <TabsTrigger value="createProduct" className="flex w-full h-full gap-2">
          <PackagePlus />
          <p className="text-xl">Create Product</p>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
