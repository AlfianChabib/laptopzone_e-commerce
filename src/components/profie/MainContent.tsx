import React from "react";
import { TabsContent } from "../ui/tabs";

export default function MainContent() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 border rounded-md">
      <TabsContent value="profile">
        <h1 className="text-3xl">Profile</h1>
      </TabsContent>
      <TabsContent value="products">
        <h1 className="text-3xl">Products</h1>
      </TabsContent>
      <TabsContent value="carts">
        <h1 className="text-3xl">Carts</h1>
      </TabsContent>
      <TabsContent value="wishlists">
        <h1 className="text-3xl">Wishlists</h1>
      </TabsContent>
      <TabsContent value="createProduct">
        <h1 className="text-3xl">Create Product</h1>
      </TabsContent>
    </div>
  );
}
