import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NewProject from './pages/NewProject';

// Componente para la página principal del portfolio
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a192f]">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/new-project" element={<NewProject />} />
      </Routes>
    </Router>
  );
}

export default App;
