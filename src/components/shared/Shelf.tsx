"use client";

export function Shelf({ children }: { children: React.ReactNode }) {
  return (
    <div className="shelf-container mb-12 sm:mb-16">
      <div className="shelf-items">
        {children}
      </div>
      <div className="shelf-board" />
    </div>
  );
}
