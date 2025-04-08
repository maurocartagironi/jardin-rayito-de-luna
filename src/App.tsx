import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/layout/Layout';

import Homepage from '@/pages/Homepage';
import Actividades from '@/pages/Actividades';
import Instalaciones from '@/pages/Instalaciones';
import Galeria from '@/pages/Galeria';
import SobreNosotros from '@/pages/SobreNosotros';
import Inscripcion from '@/pages/Inscripcion';
import Noticias from '@/components/home/Noticias';
import Login from '@pages/Login';
import Dashboard from '@pages/auth/Dashboard';
import ProtectedRoute from '@utils/ProtectedRoute';
import Registracion from '@pages/Registracion';
import { ContentProvider } from '@/context/ContentContext';
import { GalleryProvider } from '@/context/GalleryContext';

const App: React.FC = () => {
    const hasConfigLogin = import.meta.env.VITE_ENABLE_LOGIN_USER === 'true';

    return (
        <ContentProvider>
            <GalleryProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Homepage />} />
                            <Route
                                path="/actividades"
                                element={<Actividades />}
                            />
                            <Route
                                path="/instalaciones"
                                element={<Instalaciones />}
                            />
                            <Route path="/galeria" element={<Galeria />} />
                            <Route
                                path="/sobrenosotros"
                                element={<SobreNosotros />}
                            />
                            <Route
                                path="/inscripcion"
                                element={<Inscripcion />}
                            />
                            <Route path="/noticias" element={<Noticias />} />
                            {hasConfigLogin && (
                                <>
                                    <Route
                                        path="/register"
                                        element={<Registracion />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <ProtectedRoute>
                                                <Dashboard />
                                            </ProtectedRoute>
                                        }
                                    />
                                </>
                            )}
                        </Route>
                    </Routes>
                </Router>
            </GalleryProvider>
        </ContentProvider>
    );
};

export default App;
