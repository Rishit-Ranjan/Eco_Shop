import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
export default function Layout({ children }) {
    return (<div className="flex flex-col min-h-screen bg-[#F7F6F2]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>);
}
