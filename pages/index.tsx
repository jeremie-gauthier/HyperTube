import SiteLayout from "@/components/Layouts/SiteLayout";

function Home() {
  return (
    <div>
      <main>
        <h1 className="text-black">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

Home.Layout = SiteLayout;
export default Home;
