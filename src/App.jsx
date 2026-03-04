import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Features/Views/Home';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the hamburger menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  // Shared class logic for NavLinks
  const navLinkClasses = ({ isActive }) => 
    `transition-all duration-300 ${
      isActive 
        ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <Router>
      <div className="bg-[#0f0c13] min-h-screen selection:bg-fuchsia-500/30">
        
        {/* ─── NAVIGATION BAR ─── */}
        <nav className="sticky top-0 z-[100] bg-[#0f0c13]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Brand Logo */}
            <NavLink to="/" className="text-white font-serif italic text-xl tracking-tighter">
              PORT<span className="text-orange-500">FOLIO</span>
            </NavLink>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex gap-10 uppercase text-[11px] font-bold tracking-[0.2em]">
              <NavLink to="/" end className={navLinkClasses}>Home</NavLink>
              <NavLink to="/about" className={navLinkClasses}>About</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
            </div>

            {/* Hamburger Toggle Button (Hidden on Desktop) */}
            <button 
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[110] relative focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`} />
              <span className={`block w-6 h-0.5 bg-white my-0.5 transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`} />
            </button>
          </div>

          {/* ─── MOBILE MENU OVERLAY ─── */}
          <div className={`fixed inset-0 bg-[#0f0c13] z-[105] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <div className="flex flex-col gap-10 text-center uppercase tracking-[0.3em] font-bold">
              <NavLink to="/" end onClick={closeMenu} className="text-2xl text-gray-400 hover:text-orange-500 transition-colors">
                Home
              </NavLink>
              <NavLink to="/about" onClick={closeMenu} className="text-2xl text-gray-400 hover:text-orange-500 transition-colors">
                About
              </NavLink>
              <NavLink to="/contact" onClick={closeMenu} className="text-2xl text-gray-400 hover:text-orange-500 transition-colors">
                Contact
              </NavLink>
            </div>
          </div>
        </nav>

        {/* ─── ROUTE CONTENT ─── */}
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="text-white text-center py-40">About Section Content</div>} />
            <Route path="/contact" element={<div className="text-white text-center py-40">Contact Section Content</div>} />
          </Routes>
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="py-1 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                © 2026 Jeorge Rey M. Antipaso • Developed with React & Tailwind
            </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
