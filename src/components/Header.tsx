"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Badge,
  Divider,
} from "@nextui-org/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCart2, BsBookmark } from "react-icons/bs";
import { RiSearch2Line } from "react-icons/ri";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      classNames={{
        base: "border-b",
        wrapper: "px-4 py-4",
      }}
    >
      <NavbarContent className="hidden md:flex">
        <NavbarBrand>
          <p className="font-semibold text-green-600 text-lg">Laptop Zone</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-1 md:gap-4">
        <Input
          classNames={{
            input: "text-small w-full",
            inputWrapper:
              "h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search In LaptopZone..."
          size="sm"
          startContent={<RiSearch2Line size={18} />}
          type="search"
        />
        <Divider orientation="vertical" />
        <Badge content="10" shape="circle" color="danger">
          <Button isIconOnly variant="flat" className="text-gray-600">
            <BsBookmark size={20} />
          </Button>
        </Badge>
        <Badge content="10" shape="circle" color="danger">
          <Button isIconOnly variant="flat" className="text-gray-600">
            <BsCart2 size={20} />
          </Button>
        </Badge>
        <Divider orientation="vertical" />
        <NavbarItem className="hidden md:flex gap-4">
          <Button
            className="text-green-600 font-medium"
            variant="bordered"
            color="success"
          >
            <p>Login</p>
          </Button>
          <Button
            className="text-white font-medium"
            variant="solid"
            color="success"
          >
            <p>Sign Up</p>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="md:hidden flex"
            isIconOnly
            variant="light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AiOutlineMenu size={20} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
