import React, { useState } from 'react'; 
import { useHomeController } from '../Controllers/HomeController';

const Home = () => {
    const { viewModel } = useHomeController();
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [selectedCert, setSelectedCert] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const glassStyle = "bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-2xl transition-all hover:scale-105 hover:bg-white/10 duration-300 rounded-xl";
    const slides = viewModel.slides || []; 
    
    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
       <div 
            className="relative w-full min-h-screen flex flex-col items-center bg-[#050505] py-20 lg:py-35 px-4 overflow-x-hidden"
            onMouseMove={(e) => {
                const { currentTarget: target, clientX: x, clientY: y } = e;
                const { left, top } = target.getBoundingClientRect();
                target.style.setProperty("--x", `${x - left}px`);
                target.style.setProperty("--y", `${y - top}px`);
            }}>

            {/* ─── MAIN BACKGROUND  ─── */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
                style={{
                    backgroundImage: `linear-gradient(to right, #f97316 2px, transparent 1px), linear-gradient(to bottom, #f97316 2px, transparent 1px)`,
                    backgroundSize: '35px 35px',
                    WebkitMaskImage: `radial-gradient(900px circle at var(--x, 50%) var(--y, 50%), black, transparent)`,
                    maskImage: `radial-gradient(900px circle at var(--x, 50%) var(--y, 50%), black, transparent)`,
                }} 
            />
            
            {/* ─── SECTION 1: HERO (Profile Card) ─── */}
            <div className="relative w-full max-w-5xl h-[400px] flex items-center mb-20">
                <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-[110%] h-[280px] z-[5] bg-white/5 backdrop-blur-md border-[3px] border-orange-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] [clip-path:polygon(0%_25%,55%_5%,100%_5%,100%_75%,45%_95%,0%_95%)]" />
                <div className="absolute left-[161px] top-1/2 -translate-y-1/2 w-[90%] h-[270px] z-10 bg-white/10 backdrop-blur-xl border-2 border-orange-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] [clip-path:polygon(0%_0%,45%_0%,100%_30%,100%_100%,55%_100%,0%_70%)] flex flex-col justify-center py-8 pr-[20%] pl-16">
                    <h1 className="absolute bottom-[165px] font-serif italic font-light text-[clamp(1.6rem,3.5vw,3rem)] tracking-tight leading-[1.15] text-white m-0">
                        {viewModel.name}
                    </h1>
                    <p className="absolute bottom-[145px] font-sans text-[clamp(0.55rem,1vw,0.7rem)] tracking-[0.28em] uppercase text-slate-400/65 mt-2.4">
                        {viewModel.role}
                    </p>
                </div>      
                <div className="absolute left-[65%] bottom-[62px] h-[110%] w-[45%] z-20 flex items-end justify-center pointer-events-none">
                    <img src={viewModel.profileImage} alt="Profile" className="h-full w-full object-contain object-bottom drop-shadow-[0_0_32px_rgba(0,0,0,0.7)]" />
                </div>
            </div>


            {/* ─── SECTION 2: LINEAR GRID ─── */}
            <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 px-1 mt-10">
                {/* Background Box */}
                <div className={`${glassStyle} relative group overflow-hidden min-h-[250px]`} style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)' }}>
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] z-20" />
                    <div className="pl-6 pt-6 pr-4">
                        <h3 className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-4">Background</h3>
                        <p className="text-white/70 text-sm leading-relaxed italic">{viewModel.description}</p>
                    </div>
                </div>

                {/* Tech Stack Box */}
                <div className={`${glassStyle} relative group min-h-[250px] md:col-span-1`} style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)' }}>
                    <div className="absolute inset-0 border border-orange-500/30 pointer-events-none" style={{ clipPath: 'polygon(15% 0%, 16% 0%, 1% 20%, 0% 21%, 0% 0%)', backgroundColor: '#f97316' }} />
                    <div className="pt-10 px-6 pb-6">
                        <h3 className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-6">Technical Stack</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {viewModel.skills?.map((skill) => (
                                <div key={skill.name} className="group/skill">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center gap-2">
                                            <img src={skill.icon} className="w-4 h-4 opacity-70 group-hover/skill:opacity-100 transition-opacity" alt="" />
                                            <span className="text-[11px] text-white/80 font-medium tracking-wide">{skill.name}</span>
                                        </div>
                                        <span className="text-[9px] text-orange-500/50 font-mono">{skill.level}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_8px_#f97316] transition-all duration-1000" style={{ width: skill.level }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Box */}
                <div className={`${glassStyle} relative flex flex-col justify-between border-t border-r border-orange-500/40 min-h-[250px]`} style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)', boxShadow: 'inset 0 0 20px rgba(249, 115, 22, 0.05)' }}>
                    <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/20 blur-xl pointer-events-none" />
                    <div className="pt-6 px-6">
                        <h3 className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-4">Current Status</h3>
                        <p className="text-white text-xl font-medium">Available for Hire</p>
                        <p className="text-white/40 text-[11px] mt-2 italic">Specializing in .NET & React</p>
                    </div>
                    <div className="p-6">
                        <button onClick={() => window.open("https://linkedin.com/in/jeorge-rey-m-antipaso-110555290", "_blank")} className="relative w-full py-3 bg-transparent border border-orange-500/50 text-orange-500 text-[10px] uppercase tracking-widest font-bold overflow-hidden group/btn hover:text-black transition-colors duration-300">
                            <span className="relative z-10">Connect on LinkedIn</span> 
                            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── SECTION 3: PROJECTS & SEMINARS SLIDER ─── */}
            <div className="relative w-full max-w-7xl mt-12 px-1 mb-20 z-30">
                <div 
                    className={`${glassStyle} relative w-full overflow-hidden group min-h-[550px]`}
                    style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)' }}
                >
                    <div className="flex flex-col lg:flex-row h-full min-h-[550px]">
                        
                        {/* Slide Content */}
                        <div className="flex-[0.8] p-8 md:p-12 flex flex-col justify-between z-20 bg-[#050505]/60 backdrop-blur-md">
                            <div>
                                <h3 className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-2">Portfolio Case Studies</h3>
                                <div className="overflow-hidden">
                                    <h2 className="text-white text-4xl font-serif italic min-h-[100px]">
                                        {slides[currentSlide]?.title}
                                    </h2>
                                </div>
                                <p className="text-white/50 mt-4 italic text-sm border-l border-orange-500 pl-4">
                                    {slides[currentSlide]?.desc}
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-6">
                                <div className="flex gap-2">
                                    <button onClick={prevSlide} className="p-3 border border-white/10 hover:border-orange-500 transition-colors text-white">
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button onClick={nextSlide} className="p-3 border border-white/10 hover:border-orange-500 transition-colors text-white">
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                <div className="text-[10px] tracking-widest text-white/30 uppercase font-mono">
                                    <span className="text-orange-500">{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
                                </div>
                            </div>
                        </div>

                        {/* Slide Images */}
                        <div className="flex-[1.2] relative overflow-hidden bg-black min-h-[350px]">
                            {slides.map((slide, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-80 scale-100' : 'opacity-0 scale-110'}`}
                                >
                                   <img 
                                        src={slide.img} 
                                        alt={slide.title}
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                            ))}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_100px_0_100px_-50px_rgba(5,5,5,0.9)]" />
                        </div>
                    </div>

                    {/* Slider Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
                        <div 
                            className="h-full bg-orange-500 transition-all duration-500 shadow-[0_0_10px_#f97316]" 
                            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} 
                        />
                    </div>
                </div>
            </div>

           {/* ─── SECTION 4: CERTIFICATES & AWARDS ─── */}
                <div className="relative w-full max-w-7xl px-1 mb-32 z-30">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-white text-2xl font-serif italic">Certificates & Recognitions</h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {viewModel.certificates?.map((cert, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedCert(cert)} 
                                className={`${glassStyle} group relative flex flex-col items-start gap-4 overflow-hidden border-orange-500/20 cursor-pointer`}
                            >
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-8 h-8 bg-orange-500/10 transition-colors group-hover:bg-orange-500/20 [clip-path:polygon(100%_0%,_0%_0%,_100%_100%)]" />
                                
                                <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">
                                    {cert.icon}
                                </div>

                                <div>
                                    <h4 className="text-white font-medium text-sm leading-tight mb-1 group-hover:text-orange-400 transition-colors">
                                        {cert.title}
                                    </h4>
                                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                                        {cert.issuer}
                                    </p>
                                </div>

                                {/* View Hint Icon */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>

                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── CERTIFICATE MODAL (LIGHTBOX) ─── */}
                {selectedCert && (
                    <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSelectedCert(null)}
                    >
                        <div 
                            className="relative max-w-4xl w-full bg-[#111] border border-white/10 p-2 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <button 
                                className="absolute top-4 right-4 z-[110] p-2 bg-black/50 text-white rounded-full hover:bg-orange-500 transition-colors"
                                onClick={() => setSelectedCert(null)}
                            >
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <img 
                                src={selectedCert.image} 
                                alt={selectedCert.title} 
                                className="w-full h-auto max-h-[80vh] object-contain rounded"
                            />

                            <div className="p-6">
                                <h3 className="text-white text-xl font-serif italic">{selectedCert.title}</h3>
                                <p className="text-orange-500 text-sm font-mono mt-1">{selectedCert.issuer} — {selectedCert.date}</p>
                            </div>
                        </div>
                    </div>
                )}


        </div>
    );
};

export default Home;