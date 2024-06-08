import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavigationEvents from "./loading.client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Peoples Bank",
  description: "Banking Project by Sayak Dutta ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NavigationEvents />
          {children}        
        </AntdRegistry>
      </body>
    </html>
  );
}
