"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export function UseTemplateSubmitButton({ className = "" }: { className?: string }) {
  const { pending } = useFormStatus();
  const [isLocked, setIsLocked] = useState(false);
  const lockTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pending) {
      setIsLocked(false);
    }
  }, [pending]);

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current !== null) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const isDisabled = pending || isLocked;

  return (
    <button
      type="submit"
      onClick={() => {
        if (isDisabled) {
          return;
        }

        lockTimeoutRef.current = window.setTimeout(() => {
          setIsLocked(true);
          lockTimeoutRef.current = null;
        }, 0);
      }}
      disabled={isDisabled}
      className={[
        "inline-flex font-mono text-[11px] uppercase tracking-[0.22em] transition-colors disabled:cursor-wait disabled:opacity-70",
        className,
      ].join(" ")}
    >
      {isDisabled ? "Creating draft..." : "Use Template"}
    </button>
  );
}
