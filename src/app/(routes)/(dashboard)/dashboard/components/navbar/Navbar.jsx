"use client";

import Clock from "@/components/Clock/Clock";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import {
  Navbar,
  NavbarContent,
} from "@nextui-org/react";

function NavbarHeader() {
  return (
    <Navbar isBlurred isBordered >
      <NavbarContent justify="start">
        <Clock />
      </NavbarContent>

      <NavbarContent className="items-center" justify="end">
        <ThemeSwitcher />
        {/* <Dropdown placement="bottom-end" backdrop="blur">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              src="https://avatars.githubusercontent.com/u/69631?v=4"
              size="sm"
              className="cursor-pointer transition-transform"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem>
                <User
                  name="Jackson Sebastián"
                  description="@jacksebastiandev"
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: "https://avatars.githubusercontent.com/u/69631?v=4",
                  }}
                />
              </DropdownItem>
            </DropdownSection>

            <DropdownItem className="p-3">
              <div className="flex items-center gap-2">
                <MdPerson />
                Profile
              </div>
            </DropdownItem>
            <DropdownItem className="p-3">
              <div className="flex items-center gap-2">
                <MdSettings />
                Settings
              </div>
            </DropdownItem>
            <DropdownItem className="p-3">
              <div className="flex items-center gap-2">
                <MdLogout />
                Logout
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
        <UserButton />
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarHeader;

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
