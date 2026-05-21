"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";
import type { ColorPreset } from "@/lib/colorPresets";
import type { AccentColorName } from "@/types/portfolio";

interface ColorPickerProps {
  presets: ColorPreset[];
  currentColor: string;
  onChange: (preset: ColorPreset) => void;
}

export function ColorPicker({ presets, currentColor, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isClient, setIsClient] = useState(false);
  
  const isCustomActive = !presets.some((p) => p.value === currentColor);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    
    function updatePosition() {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        
        // Calculate position to prevent overflowing the screen
        let top = rect.bottom + 8;
        let left = rect.left;
        
        if (typeof window !== 'undefined') {
          // Approximate height and width of the color picker popover
          const popoverHeight = 260;
          const popoverWidth = 224; 
          
          if (top + popoverHeight > window.innerHeight) {
            top = rect.top - popoverHeight - 8;
          }
          if (left + popoverWidth > window.innerWidth) {
            left = window.innerWidth - popoverWidth - 16;
          }
        }
        
        setCoords({ top, left });
      }
    }

    if (isOpen) {
      updatePosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updatePosition);
      // Capture true to listen for scroll events on any scrollable parent
      window.addEventListener("scroll", updatePosition, true);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {presets.map((preset) => {
        const isActive = preset.value === currentColor;

        return (
          <button
            key={preset.name}
            type="button"
            onClick={() => {
              onChange(preset);
              setIsOpen(false);
            }}
            className={`flex items-center gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition ${
              isActive ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface text-on-surface hover:border-outline"
            }`}
          >
            <span className={`h-4 w-4 shrink-0 rounded-full border ${isActive ? "border-on-primary/20" : "border-outline-variant"}`} style={{ backgroundColor: preset.value }} />
            <span>{preset.label}</span>
          </button>
        );
      })}

      <div>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition ${
            isCustomActive ? "border-primary bg-primary text-on-primary" : "border-outline-variant bg-surface text-on-surface hover:border-outline"
          }`}
        >
          <div className={`relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full border ${isCustomActive ? "border-on-primary/20" : "border-outline-variant"}`}>
            {isCustomActive ? (
              <div className="absolute inset-0" style={{ backgroundColor: currentColor }} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant opacity-80">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
              </svg>
            )}
          </div>
          <span>Custom</span>
        </button>
        
        {isClient && isOpen && createPortal(
          <div 
            ref={popoverRef}
            className="fixed z-[9999] rounded-2xl border border-outline-variant bg-surface p-4 shadow-2xl"
            style={{ 
              top: `${coords.top}px`, 
              left: `${coords.left}px`,
            }}
          >
            <div className="overflow-hidden rounded-xl ring-1 ring-outline-variant/50">
              <HexColorPicker 
                color={currentColor} 
                onChange={(color) => onChange({ name: "custom" as AccentColorName, label: "Custom", value: color })} 
              />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-variant px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
              <span className="text-xs font-semibold text-on-surface-variant">HEX</span>
              <input 
                type="text" 
                value={currentColor} 
                onChange={(e) => {
                  const val = e.target.value;
                  onChange({ name: "custom" as AccentColorName, label: "Custom", value: val });
                }}
                className="w-full bg-transparent text-sm font-mono uppercase text-on-surface outline-none"
              />
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
