'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from "next/image";
import { User } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";


export  function NavbarHome() {
  const {userId} = useAuth()
  return (
    <Navbar>
      <NavbarBrand>
        <Image src="/webby2-dark.svg" width={50} height={50} alt="logo" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {userId ? (
          <UserButton />
        ) : (
          <Button as={Link} color="primary" href="/sign-in" variant="flat">
            Iniciar sesión
            <User className="ml-2 w-4 h-4" />
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
