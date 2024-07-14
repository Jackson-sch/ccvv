import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from "next/image";
import { User } from "lucide-react";


export default function NavbarHome() {
  return (
    <Navbar>
      <NavbarBrand>
        <Image src="/webby2-dark.svg" width={50} height={50} alt="logo" />
        {/* <p className="font-bold text-inherit">ACME</p> */}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/dashboard" variant="flat">
          Iniciar sesión
                <User className="ml-2 w-4 h-4" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
