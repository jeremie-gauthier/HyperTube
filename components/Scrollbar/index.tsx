import PerfectScrollbar, { ScrollBarProps } from "react-perfect-scrollbar";

type ScrollBarComponentProps = React.HTMLAttributes<HTMLDivElement> &
  ScrollBarProps & {
    children: React.ReactNode;
  };

export default function Scrollbar({
  children,
  ...rest
}: ScrollBarComponentProps) {
  return (
    <PerfectScrollbar style={{ touchAction: "none" }} {...rest}>
      {children}
    </PerfectScrollbar>
  );
}
