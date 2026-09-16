"use client";

import React from "react";
import Loader from "./loader";
import PageLoader from "./page-loader";

export function PixelLoader({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return <Loader className={className} color={color} />;
}

export { PageLoader, Loader };
export default Loader;
