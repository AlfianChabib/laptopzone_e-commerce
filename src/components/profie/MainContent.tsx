import React from "react";
import { TabsContent } from "../ui/tabs";

export default function MainContent() {
  return (
    <div className="flex w-full p-4 border rounded-md">
      <TabsContent value="profile" className="w-full with-navbar">
        <h1 className="text-3xl">Profile</h1>
      </TabsContent>
      <TabsContent value="products" className="w-full with-navbar">
        <h1 className="text-3xl">Products</h1>
      </TabsContent>
      <TabsContent value="carts" className="w-full with-navbar">
        <h1 className="text-3xl">Carts</h1>
      </TabsContent>
      <TabsContent value="wishlists" className="w-full with-navbar">
        <h1 className="text-3xl">Wishlists</h1>
      </TabsContent>
      <TabsContent value="createProduct" className="w-full with-navbar">
        <h1 className="text-3xl">Create Product</h1>
      </TabsContent>
    </div>
  );
}
