import Navbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>3D Chart App</title>
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
