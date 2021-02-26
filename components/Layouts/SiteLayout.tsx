import Navbar from "@/components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="body" data-testid="layout-div">
      <Navbar />
      {children}
    </div>
  );
}
