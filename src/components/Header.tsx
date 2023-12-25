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
          <p className="font-bold text-inherit">LaptopZone</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="md:flex hidden">
        <Button isIconOnly variant="light">
          <BsBookmark size={20} />
        </Button>
        <Button isIconOnly variant="light">
          <BsCart2 size={20} />
        </Button>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-1 w-full">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search In LaptopZone..."
          size="sm"
          startContent={<RiSearch2Line size={18} />}
          type="search"
        />
        <Badge content="10" shape="circle" color="primary">
          <Button isIconOnly variant="light">
            <BsBookmark size={20} />
          </Button>
        </Badge>
        <Badge content="10" shape="circle" color="primary">
          <Button isIconOnly variant="light">
            <BsCart2 size={20} />
          </Button>
        </Badge>
        <Button
          isIconOnly
          variant="light"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AiOutlineMenu size={20} />
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
