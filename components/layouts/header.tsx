"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about-us", label: "About Us" },
];

const navShadow =
  "0px 2px 5px 0px #0000000A, 0px 10px 10px 0px #00000008, 0px 22px 13px 0px #00000005, 0px 38px 15px 0px #00000003, 0px 60px 17px 0px #00000000";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="w-full">
        <div
          className="flex w-full items-center justify-between gap-4 border-b border-black/5 bg-white px-4 py-4 sm:px-6 lg:px-[48px] xl:px-[80px]"
          style={{ boxShadow: navShadow }}
        >
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-[0.04em] text-[#3D3D3D] uppercase sm:text-lg"
          >
            STICKMAN.DESIGN
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full px-4 text-sm text-[#3D3D3D] hover:bg-black/5 hover:text-[#1C1C1C]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/onboarding"
              className={cn(
                buttonVariants({ size: "lg" }),
                "ml-2 rounded-[6px] bg-[#1C1C1C] px-5 text-sm text-white hover:bg-[#2A2A2A]"
              )}
            >
              Book Your Free Call
            </Link>
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-[#3D3D3D] hover:bg-black/5 lg:hidden"
                />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open navigation menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-black/10 bg-white p-0"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-black/5 px-5 py-5">
                  <SheetTitle className="text-left text-base font-semibold tracking-[0.04em] text-[#3D3D3D] uppercase">
                    STICKMAN.DESIGN
                  </SheetTitle>
                </div>

                <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
                  {navItems.map((item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "lg" }),
                            "w-full justify-start rounded-2xl px-4 text-base text-[#3D3D3D] hover:bg-black/5 hover:text-[#1C1C1C]"
                          )}
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </nav>

                <div className="border-t border-black/5 p-4">
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/onboarding"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "w-full rounded-[6px] bg-[#1C1C1C] px-5 text-white hover:bg-[#2A2A2A]"
                        )}
                      />
                    }
                  >
                    Book Your Free Call
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
