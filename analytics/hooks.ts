"use client";

import * as React from "react";
import type { AnalyticsProperties } from "./events";
import { analyticsEvents } from "./events";
import { capture } from "./capture";

export function useTrackVisualEngagement({
  visualId,
  sectionId,
}: {
  visualId: string;
  sectionId?: string;
}) {
  const trackedRef = React.useRef(new Set<string>());

  return React.useCallback(
    (interactionType: string, properties: AnalyticsProperties = {}) => {
      const pageViewKey =
        typeof window === "undefined"
          ? "server"
          : `${window.location.pathname}${window.location.search}`;
      const key = `${pageViewKey}:${visualId}:${interactionType}`;
      if (trackedRef.current.has(key)) return;
      trackedRef.current.add(key);

      capture(analyticsEvents.interactiveVisualEngaged, {
        visual_id: visualId,
        section_id: sectionId,
        interaction_type: interactionType,
        ...properties,
      });
    },
    [sectionId, visualId]
  );
}

export function useTrackCalculator({
  users,
  cac,
  dropoff,
  annualLoss,
}: {
  users: number;
  cac: number;
  dropoff: number;
  annualLoss: number;
}) {
  const viewedRef = React.useRef(false);
  const startedRef = React.useRef(false);
  const completedRef = React.useRef(false);
  const interactionCountRef = React.useRef(0);
  const changedInputsRef = React.useRef(new Set<string>());
  const timersRef = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const interactionStartedAtRef = React.useRef<number | null>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          capture(analyticsEvents.calculatorViewed, {
            calculator_id: "cost_of_confusion",
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const trackInputChange = React.useCallback(
    (inputName: string, value: number, current: AnalyticsProperties = {}) => {
      const currentUsers = Number(current.users ?? users);
      const currentCac = Number(current.cac ?? cac);
      const currentDropoff = Number(current.dropoff ?? dropoff);
      const currentAnnualLoss = Number(current.annual_loss ?? annualLoss);

      if (!startedRef.current) {
        startedRef.current = true;
        interactionStartedAtRef.current = Date.now();
        capture(analyticsEvents.calculatorStarted, {
          calculator_id: "cost_of_confusion",
          initial_users: users,
          initial_cac: cac,
          initial_dropoff: dropoff,
          initial_annual_loss: annualLoss,
        });
      }

      interactionCountRef.current += 1;
      changedInputsRef.current.add(inputName);

      clearTimeout(timersRef.current[inputName]);
      timersRef.current[inputName] = setTimeout(() => {
        capture(analyticsEvents.calculatorInputChanged, {
          calculator_id: "cost_of_confusion",
          input_name: inputName,
          value,
          users: currentUsers,
          cac: currentCac,
          dropoff: currentDropoff,
          annual_loss: currentAnnualLoss,
          ...current,
        });
      }, 750);

      const elapsedSeconds = interactionStartedAtRef.current
        ? (Date.now() - interactionStartedAtRef.current) / 1000
        : 0;

      if (
        !completedRef.current &&
        (changedInputsRef.current.size >= 2 || elapsedSeconds >= 10)
      ) {
        completedRef.current = true;
        capture(analyticsEvents.calculatorCompleted, {
          calculator_id: "cost_of_confusion",
          users: currentUsers,
          cac: currentCac,
          dropoff: currentDropoff,
          annual_loss: currentAnnualLoss,
          interaction_count: interactionCountRef.current,
        });
      }
    },
    [annualLoss, cac, dropoff, users]
  );

  React.useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const trackTooltipOpened = React.useCallback(() => {
    capture(analyticsEvents.tooltipOpened, {
      content_id: "cost_of_confusion_info",
      component: "Calculator",
    });
  }, []);

  const trackPopoverOpened = React.useCallback(() => {
    capture(analyticsEvents.popoverOpened, {
      content_id: "cost_of_confusion_info",
      component: "Calculator",
    });
  }, []);

  return {
    ref,
    trackInputChange,
    trackTooltipOpened,
    trackPopoverOpened,
  };
}
