"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
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

const mobileTopShadow =
  "0px 2px 5px 0px #0000000A, 0px 10px 10px 0px #00000008, 0px 22px 13px 0px #00000005, 0px 38px 15px 0px #00000003, 0px 60px 17px 0px #00000000";

const mobileBottomShadow =
  "0px -3px 7px 0px #00000014, 0px -13px 13px 0px #00000012, 0px -29px 17px 0px #0000000A, 0px -51px 20px 0px #00000003, 0px -79px 22px 0px #00000000";

export function Header() {
  const mobileNavTicker = [...navItems, ...navItems];
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(57);

  useEffect(() => {
    const el = topHeaderRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Mobile top brand bar */}
      <header ref={topHeaderRef} className="sticky top-0 z-[60] w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 lg:hidden">
        <div
          className="flex w-full items-center justify-center bg-background px-4 py-4"
          style={{ boxShadow: mobileTopShadow }}
        >
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/stickman_design_logo.svg"
              alt="Stickman Design Main Logo"
              width={212}
              height={24}
              priority
              className="h-auto w-[180px] sm:w-[200px]"
            />
          </Link>
        </div>
      </header>

      {/* Desktop header */}
      <header className="sticky top-0 z-40 hidden w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 lg:block">
        <div
          className="flex w-full items-center justify-between gap-4 border-b border-black/5 bg-background px-4 py-4 sm:px-6 lg:px-[48px] xl:px-[80px]"
          style={{ boxShadow: navShadow }}
        >
          <Link
            href="/"
            className="shrink-0 flex items-center"
          >
            <Image
              src="/stickman_design_logo.svg"
              alt="Stickman Design"
              width={180}
              height={20}
              priority
              className="h-auto w-[160px] lg:w-[180px]"
            />
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
              href="https://cal.eu/savio"
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex h-9 cursor-pointer items-center justify-center rounded-[6px] bg-[#1C1C1C] px-5 text-sm font-medium text-white transition-colors hover:bg-[#3775E9]"
            >
              Book Your Free Call
            </Link>
          </div>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        <div
          className="flex w-full items-center bg-background/95 py-2.5 backdrop-blur supports-backdrop-filter:bg-background/90"
          style={{ boxShadow: mobileBottomShadow }}
        >
          {/* 3 Vertical Sections with Marquees */}
          <div className="grid flex-1 grid-cols-3">
            {[0, 1, 2].map((i) => {
              // Only Onboarding, Dashboards, and Case Studies for the moving section
              const tickerItems = navItems.filter(item => item.label !== "About Us");

              // Offset items so each section starts with a different name
              // tickerItems order: 0:Onboarding, 1:Dashboards, 2:Case Studies
              const slotItems = i === 0
                ? [tickerItems[0], tickerItems[1], tickerItems[2]] // Starts with Onboarding
                : i === 1
                  ? [tickerItems[1], tickerItems[2], tickerItems[0]] // Starts with Dashboards
                  : [tickerItems[2], tickerItems[0], tickerItems[1]]; // Starts with Case Studies

              return (
                <div
                  key={i}
                  className={cn(
                    "relative flex min-w-0 items-center justify-center border-r border-black/15",
                    i === 2 && "border-r-0"
                  )}
                >
                  {/* Centralized clipping window for the marquee */}
                  <div className="relative w-full max-w-[80%] overflow-hidden text-center">
                    <div
                      className="mobile-nav-marquee flex min-w-max items-center py-1"
                      style={{
                        animationDuration: "15s", // Uniform speed keeps them perfectly offset
                      }}
                    >
                      {[...slotItems, ...slotItems].map((item, index) => (
                        <Link
                          key={`${item.href}-${i}-${index}`}
                          href={item.href}
                          className="shrink-0 pr-6 text-[13px] font-medium tracking-tight text-[#3D3D3D] transition-colors hover:text-[#1C1C1C]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center border-l border-black/[0.08] px-4">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 shrink-0 text-[#3D3D3D] hover:bg-transparent"
                  />
                }
              >
                <Menu className="size-6" strokeWidth={2.5} />
                <span className="sr-only">Open navigation menu</span>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                showCloseButton={false}
                className="border-0 bg-background px-0 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-0"
                style={{ top: headerHeight }}
              >
                <div className="relative flex h-full flex-col">
                  <SheetTitle className="sr-only">Navigation menu</SheetTitle>

                  {/* X close — absolutely top-right */}
                  <div className="absolute right-4 top-4">
                    <SheetClose
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#3D3D3D] hover:bg-black/5 hover:text-[#1C1C1C]"
                        />
                      }
                    >
                      <X className="size-5" strokeWidth={2.5} />
                      <span className="sr-only">Close menu</span>
                    </SheetClose>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
                    {navItems.map((item) => (
                      <SheetClose
                        key={item.href}
                        nativeButton={false}
                        render={
                          <Link
                            href={item.href}
                            className="text-xl font-medium text-[#3D3D3D] transition-colors hover:text-[#1C1C1C]"
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    ))}

                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href="https://cal.eu/savio"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex h-9 min-w-[220px] cursor-pointer items-center justify-center rounded-[6px] bg-[#1C1C1C] px-8 text-sm font-medium text-white transition-colors hover:bg-[#3775E9]"
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
      </div>
    </>
  );
}
