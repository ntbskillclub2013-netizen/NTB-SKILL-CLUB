import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

type Base = { id: string; label: string };

function Field({ id, label, children }: Base & { children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export function Input({ id, label, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return <Field id={id} label={label}><input id={id} className="control" {...rest} /></Field>;
}

export function Select({ id, label, children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  return <Field id={id} label={label}><select id={id} className="control" {...rest}>{children}</select></Field>;
}

export function Textarea({ id, label, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Field id={id} label={label}><textarea id={id} className="control" {...rest} /></Field>;
}
