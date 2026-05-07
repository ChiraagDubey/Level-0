"use client";

import { createElement, type ElementType, useEffect, useState } from "react";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  as?: ElementType;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({
  value,
  onSave,
  className,
  as = "p",
  multiline = false,
  placeholder = "Click to edit",
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = () => {
    onSave(draft);
    setIsEditing(false);
  };

  if (isEditing) {
    const fieldClassName = `${className ?? ""} w-full rounded-2xl border border-outline-variant bg-surface/95 px-3 py-2 outline-none ring-4 ring-surface-variant`;

    if (multiline) {
      return createElement(as, {}, (
        <textarea
          autoFocus
          value={draft}
          rows={Math.max(4, draft.split("\n").length)}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setDraft(value);
              setIsEditing(false);
            }
          }}
          className={fieldClassName}
        />
      ));
    }

    return createElement(as, {}, (
      <input
        autoFocus
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit();
          }
          if (event.key === "Escape") {
            setDraft(value);
            setIsEditing(false);
          }
        }}
        className={fieldClassName}
      />
    ));
  }

  return createElement(
    as,
    { className },
    <span
      role="button"
      tabIndex={0}
      onClick={() => setIsEditing(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsEditing(true);
        }
      }}
      className="cursor-text rounded-lg transition hover:bg-surface-variant focus:outline-none focus:ring-4 focus:ring-surface-variant"
    >
      {value || placeholder}
    </span>,
  );
}
