import "./global.css";
import { Nunito } from "next/font/google";
import Header from "./ui/header/header.jsx";
import Footer from "./ui/footer/footer.jsx";
import { StoreProvider } from "@/redux/slices/StoreProvider";
import styles from "./layout.module.scss";

const mont = Nunito({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "abz.agency",
  description: "test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles[mont.className]}>
        <StoreProvider>
          <div className={styles[`wrapper`]}>
            <Header />
            <main className={styles[`main`]}>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
