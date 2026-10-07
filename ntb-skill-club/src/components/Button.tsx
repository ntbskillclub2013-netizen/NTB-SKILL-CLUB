import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

export function Button({ variant = "primary", className = "", type = "button", ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={`btn btn-${variant} ${className}`.trim()} {...rest} />;
}
