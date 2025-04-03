import { useEffect, useState } from 'react';
import Topbar from '@components/Topbar';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import FloatingContactButton from '@components/FloatingContactButton';

const Layout = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Detectar si es escritorio
        const checkScreen = () => {
            setIsDesktop(window.innerWidth >= 768); // md: breakpoint
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);

        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    useEffect(() => {
        if (!isDesktop) return; // No aplicar comportamiento en mobile

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const viewportHeight = window.innerHeight;

            const scrolledEnough = currentScroll > viewportHeight * 0.2;

            if (scrolledEnough) {
                if (currentScroll < lastScrollY) {
                    setShowHeader(true); // Scroll arriba
                } else {
                    setShowHeader(false); // Scroll abajo
                }
            }

            setLastScrollY(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isDesktop]);

    return (
        <div className="min-h-screen bg-background font-rayito flex flex-col">
            {isDesktop ? (
                <>
                    <div className="sticky top-0 z-50 bg-white">
                        <Topbar />
                    </div>
                    <div
                        className={`sticky top-[32px] z-40 transition-transform duration-300 bg-white ${
                            showHeader ? 'translate-y-0' : '-translate-y-full'
                        }`}
                    >
                        <Header />
                    </div>
                </>
            ) : (
                <>
                    <Topbar />
                    <Header />
                </>
            )}

            <main className="flex-1">
                <Outlet />
                <FloatingContactButton />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
