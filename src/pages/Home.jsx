import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SolutionsSection from '../components/SolutionsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SolutionsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
