import React from "react";

// Shared payment method icon helper (optional for future refactors)
export function PaymentMethodIcon({ method, className = "w-5 h-5", style }) {
  const iconColor = style?.color;
  switch (method) {
    case "card":
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke={iconColor || "currentColor"}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='3' y='5' width='18' height='14' rx='2' />
          <line x1='3' y1='10' x2='21' y2='10' />
          <line x1='7' y1='15' x2='11' y2='15' />
        </svg>
      );
    case "paypal":
      return (
        <svg className={className} viewBox='0 0 24 24' fill={iconColor || "currentColor"}>
          <path d='M16.6 7.6c-1-.2-2-.2-3.1-.1H11l-.9 5.2H12c.8 0 1.6-.1 2.3-.3 1.6-.5 2.5-1.6 2.8-3.1.2-1-.1-1.6-.5-1.9z' />
          <path d='M13.8 6.1c1.2-.2 2.4-.2 3.5.1 1 .3 1.9 1.1 2.1 2.4.2 1.3-.2 2.7-1 3.8-1.4 2-3.9 2.9-6.3 3H11l-.6 3.3h-2.7l1.8-10.6c.1-.4.5-.7.9-.7h3.4z' />
        </svg>
      );
    case "apple":
      return (
        <svg className={className} viewBox='0 0 24 24' fill={iconColor || "currentColor"}>
          <path d='M16.7 13.3c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.2-1.6 2.8-.4 6.9 1.1 9.1.8 1.2 1.7 2.5 2.9 2.5 1.1 0 1.6-.7 3-0.7 1.4 0 1.8.7 3 .7 1.2 0 2-.9 2.8-2 .8-1.1 1.2-2.2 1.2-2.2s-2.3-.9-2.3-3z' />
          <path d='M14.9 5.6c.6-.8 1-2 .9-3.1-1 .1-2.2.7-2.8 1.5-.6.7-1.1 1.9-1 3 .9.1 2-.5 2.9-1.4z' />
        </svg>
      );
    case "google":
      return (
        <svg
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke={iconColor || "currentColor"}
          strokeWidth='2'
        >
          <path
            d='M21 12.2c0-.7-.1-1.3-.3-1.9H12v3.6h5.1c-.2 1-.8 1.9-1.7 2.5v2.4h2.8c1.6-1.5 2.8-3.7 2.8-6.6z'
            fill='currentColor'
            stroke='none'
          />
          <path
            d='M12 22c2.4 0 4.4-.8 5.9-2.2l-2.8-2.4c-.8.6-1.8 1-3.1 1-2.3 0-4.2-1.6-4.9-3.7H4.2v2.5C5.7 20 8.6 22 12 22z'
            fill='currentColor'
            stroke='none'
            opacity='.85'
          />
          <path
            d='M7.1 14.7c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.6H4.2C3.4 10 3 11.6 3 13s.4 3 1.2 4.4l2.9-2.7z'
            fill='currentColor'
            stroke='none'
            opacity='.7'
          />
          <path
            d='M12 6.1c1.3 0 2.3.4 3.1 1l2.3-2.3C15.9 3.5 13.9 2.6 12 2.6c-3.4 0-6.3 2-7.8 4.9l2.9 2.7c.7-2.1 2.6-3.6 4.9-3.6z'
            fill='currentColor'
            stroke='none'
            opacity='.6'
          />
        </svg>
      );
    default:
      return null;
  }
}
