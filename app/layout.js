import "./globals.css";
import { DM_Sans } from "next/font/google";
import { CartDrawer } from "./components/CartDrawer";
import { CartIcon } from "./components/CartIcon";
import { CartProvider } from "./context/CartContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "[FP] Fresh Press | Premium Cold-Pressed Juices",
  description:
    "Experience the purest cold-pressed juices made from fresh, organic ingredients. Boost your health with our premium juice blends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={dmSans.className}>
        <CartProvider>
          <Navigation />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}