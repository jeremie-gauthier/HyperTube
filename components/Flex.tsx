import React from "react";

type FlexProps = {
  children: React.ReactNode;
} & Partial<DefaultProps>;

type DefaultProps = {
  className: string;
};

export const FlexCol = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className = "", ...rest }, forwardRef) => (
    <div ref={forwardRef} className={`flex flex-col ${className}`} {...rest}>
      {children}
    </div>
  ),
);

export const FlexRow = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className = "", ...rest }, forwardRef) => (
    <div ref={forwardRef} className={`flex flex-row ${className}`} {...rest}>
      {children}
    </div>
  ),
);
