import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
export default function Layout({ children }) {
    return (<div className="flex flex-col min-h-screen bg-natural-bg dark:bg-dark-bg text-natural-text dark:text-dark-text transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>);
}
