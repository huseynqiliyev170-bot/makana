import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.7-1.7-1-2.3-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.7.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M2 6h11v10H2zM13 9h4.6L21 12.4V16h-8z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  );
}

export function ZoomIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21M8.5 11h5M11 8.5v5" />
    </svg>
  );
}

export function OrnamentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true" {...props}>
      <path d="M12 2l3 5 5 1.5-4 4 1 6-5-3-5 3 1-6-4-4L10 7z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg className="arrow" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true" {...props}>
      <path d="M0 5h14M10 1l4 4-4 4" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
      <path d="M1 1.5L6 6.5L11 1.5" />
    </svg>
  );
}

import type { ComponentType } from "react";

const MAP = {
  wa: WhatsAppIcon,
  ig: InstagramIcon,
  pin: PinIcon,
  truck: TruckIcon,
  star: StarIcon,
  zoom: ZoomIcon,
  ornament: OrnamentIcon,
} as const;

export type IconName = keyof typeof MAP;

/** Renders an icon by key; falls back to the ornamental mark. */
export function Icon({ name, ...rest }: { name: string } & IconProps) {
  const Cmp = (MAP as Record<string, ComponentType<IconProps>>)[name] ?? OrnamentIcon;
  return <Cmp {...rest} />;
}