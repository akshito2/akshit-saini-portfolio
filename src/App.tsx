import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Tools } from '@/components/Tools';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { Stats } from '@/components/Stats';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tools />
        <Services />
        <Stats />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
