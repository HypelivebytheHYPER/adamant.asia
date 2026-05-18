import { cubicBezier } from "framer-motion";

/**
 * Adamant design system easing curves as Framer Motion cubicBezier exports.
 * These mirror the CSS custom properties in globals.css for use in JS animations.
 */

/** --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1) — default transitions, scroll reveals */
export const easeSmooth = cubicBezier(0.4, 0, 0.2, 1);

/** --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) — bouncy entrances, hover states */
export const easeSpring = cubicBezier(0.34, 1.56, 0.64, 1);

/** --ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1) — emphasis, hero entrances */
export const easeDramatic = cubicBezier(0.87, 0, 0.13, 1);
