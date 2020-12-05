import Navbar from "@/components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="h-screen" data-testid="layout-div">
      <Navbar />
      {children}
    </div>
  );
}
