import SiteLayout from "@/components/Layouts/SiteLayout";
import ScrollBar from "react-perfect-scrollbar";
import styles from "./index.module.scss";

function Home() {
  return (
    <ScrollBar>
      <main className={styles.container}>
        <h1>Home Page</h1>
      </main>
    </ScrollBar>
  );
}

Home.Layout = SiteLayout;
export default Home;
