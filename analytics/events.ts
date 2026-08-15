export const analyticsEvents = {
  pageViewed: "page_viewed",
  sessionStarted: "session_started",
  sessionEnded: "session_ended",
  sectionViewed: "section_viewed",
  sectionTimeSpent: "section_time_spent",
  scrollDepthReached: "scroll_depth_reached",
  navigationClicked: "navigation_clicked",
  logoClicked: "logo_clicked",
  mobileMenuOpened: "mobile_menu_opened",
  mobileMenuClosed: "mobile_menu_closed",
  ctaClicked: "cta_clicked",
  buttonClicked: "button_clicked",
  cardViewed: "card_viewed",
  cardClicked: "card_clicked",
  caseStudyViewed: "case_study_viewed",
  caseStudyCardClicked: "case_study_card_clicked",
  caseStudySectionViewed: "case_study_section_viewed",
  calculatorViewed: "calculator_viewed",
  calculatorStarted: "calculator_started",
  calculatorInputChanged: "calculator_input_changed",
  calculatorCompleted: "calculator_completed",
  tooltipOpened: "tooltip_opened",
  popoverOpened: "popover_opened",
  interactiveVisualEngaged: "interactive_visual_engaged",
  emailClicked: "email_clicked",
  externalLinkClicked: "external_link_clicked",
  socialLinkClicked: "social_link_clicked",
  legalLinkClicked: "legal_link_clicked",
  notFoundViewed: "not_found_viewed",
  notFoundRecoveryClicked: "not_found_recovery_clicked",
  webVitalReported: "web_vital_reported",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | string[] | number[] | null | undefined
>;
