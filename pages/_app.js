import '../styles/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="pt-20">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}



