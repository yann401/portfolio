import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cybersecure from '../assets/projets/logo_vpn.jpg';
import info from '../assets/projets/info.png';
import bastion from '../assets/projets/bastion.png';


const useOnScreen = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, isVisible]);

  return isVisible;
};

const PortfolioCarousel = () => {
  const items = [
    {
      id: 1,
      title: "Cybernight : Participation à un Capture The Flag",
      description: "Depuis novembre 2024, j’ai participé à un exercice de type Capture The Flag (CTF) organisé à Efrei Paris, sur le campus de Villejuif. Cet événement reposait sur un scénario de compromission simulée, dans lequel j’ai endossé le rôle de défenseur au sein de l’équipe Blue Team. Mes missions consistaient à assurer la réponse à incident, analyser les journaux système (logs), rédiger la documentation technique et assurer la communication entre les membres de l’équipe. Ce travail collectif et technique a abouti à la production d’un rapport fictif de réponse à incident, retraçant l’ensemble des étapes d’investigation et de remédiation.",
      tools: "Wireshark, Sqlmap, kali linux , python",
      
      image: info
    },
    {
      id: 2,
      title: "Cybersecure",
      description: "Au cours du mastercamp de l'EFREI, j'étais amené avec mon équipe à concevoir et déployer une solution complète de sécurité réseau incluant la mise en place d'un pare-feu,de tunnels VPN site-to-site, d'accès à distance sécurisé, d'un IPS/IDS et d'une supervision réseau à base de produits open source",
      tools: "Pfsense, Snort, Ntopng, OpenVpn,Ipsec,Iperf",
      demoLink: "#",
      image: Cybersecure
    },
    {
      id: 3,
      title: "Mise en place d'un bastion d'administration(linux)",
      description: "L’objectif de ce projet était de créer une plateforme centralisée permettant un accès sécurisé aux serveurs via le protocole SSH. Cette solution visait à contrôler les droits d’accès des utilisateurs tout en assurant la traçabilité complète des connexions grâce à la journalisation. Pour cela, plusieurs outils ont été mis en place : OpenSSH pour les connexions sécurisées, auditd pour la journalisation des événements système, sudo pour la gestion des privilèges, iptables pour le filtrage réseau, et Fail2Ban pour la prévention des tentatives d’intrusion. Le projet a permis d’établir une gestion fine des accès administrateurs, tout en générant des traces d’audit automatisées assurant la conformité et la sécurité de l’infrastructure.",
      tools: "OpenSSH, Sudo, Fail2Ban, iptables",
      
      image: bastion
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section 
      ref={sectionRef}
      id='projets' 
      className="relative py-12 md:py-24 bg-indigo-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='text-center mb-8 md:mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Projets
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="relative min-h-[650px] md:min-h-[500px] mb-8">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute top-0 left-0 w-full"
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 relative">
                    <div className="h-72 md:h-[500px] relative overflow-hidden">
                      <img
                        src={items[currentIndex].image}
                        alt={items[currentIndex].title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      {/* Navigation buttons for mobile */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 md:hidden">
                        <button
                          onClick={handlePrev}
                          className="p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-900" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>
                    </div>
                    {/* Navigation buttons for desktop */}
                    <div className="hidden md:block">
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-900" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {items[currentIndex].title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-6">
                      {items[currentIndex].description}
                    </p>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-semibold">Technologies utilisées:</span> {items[currentIndex].tools}
                      </p>
                      <div className="flex gap-4">
                        {items[currentIndex].demoLink && items[currentIndex].demoLink !== "#" && (
                          <a
                            href={items[currentIndex].demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Démo en ligne
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-indigo-300 hover:bg-indigo-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;