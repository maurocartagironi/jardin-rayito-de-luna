import { useEffect, useRef, useState } from 'react';
import Topbar from '@components/Topbar';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import FloatingContactButton from '@components/FloatingContactButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '@/components/ScrollToTop';

const Layout = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [scrollOnTop, setScrollOnTop] = useState(true);
    const lastScrollYRef = useRef(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollOnTop(currentScroll <= 100);
                    setShowHeader(
                        currentScroll <= 50 ||
                            currentScroll < lastScrollYRef.current
                    );
                    lastScrollYRef.current = currentScroll;
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <ScrollToTop />
            <div className="min-h-screen bg-background font-rayito flex flex-col">
                {/* Header sticky: aparece al hacer scroll arriba */}
                <div
                    className={`sticky z-50 transition-all duration-500 bg-white shadow-sm h-14 md:h-16 ${
                        showHeader || isMenuOpen ? 'top-0' : '-top-20'
                    }`}
                >
                    <Header
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </div>

                {/* Topbar sticky: aparece al hacer scroll abajo */}
                <div
                    className={`sticky z-40 transition-all duration-500 bg-white shadow-sm h-9
        ${showHeader && !isMenuOpen ? '-top-20' : 'top-0'} 
        ${scrollOnTop ? 'hidden' : 'md:block'} 
        hidden`}
                >
                    <Topbar />
                </div>

                <main className="flex-1">
                    <Outlet />
                    <FloatingContactButton />
                </main>
                <Footer />
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    );
};

export default Layout;
