type FlexProps = {
  children: JSX.Element;
} & Partial<DefaultProps>;

type DefaultProps = {
  className: string;
};

export function FlexCol({
  children,
  className = "",
  ...rest
}: FlexProps): JSX.Element {
  return (
    <div
      data-testid="flex-col"
      className={"flex flex-col " + className}
      {...rest}
    >
      {children}
    </div>
  );
}

export function FlexRow({
  children,
  className = "",
  ...rest
}: FlexProps): JSX.Element {
  return (
    <div
      data-testid="flex-row"
      className={"flex flex-row " + className}
      {...rest}
    >
      {children}
    </div>
  );
}
