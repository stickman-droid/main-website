export type PageKey =
  | "home"
  | "onboarding"
  | "dashboards"
  | "case_studies_index"
  | "case_study_detail"
  | "about_us"
  | "privacy"
  | "terms"
  | "not_found"
  | "unknown";

export function getPageKey(pathname: string): PageKey {
  if (pathname === "/") return "home";
  if (pathname === "/onboarding") return "onboarding";
  if (pathname === "/dashboards") return "dashboards";
  if (pathname === "/case-studies") return "case_studies_index";
  if (pathname.startsWith("/case-studies/")) return "case_study_detail";
  if (pathname === "/about-us") return "about_us";
  if (pathname === "/privacy") return "privacy";
  if (pathname === "/terms") return "terms";
  if (pathname === "/404") return "not_found";
  return "unknown";
}

export function getCaseStudySlug(pathname: string) {
  if (!pathname.startsWith("/case-studies/")) return undefined;
  return pathname.split("/").filter(Boolean)[1];
}
