import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ContentProvider } from '@/context/ContentContext';
import { GalleryProvider } from '@/context/GalleryContext';
import { RouterProvider } from '@/context/RouterContext';

import Layout from '@/layout/Layout';
import Homepage from '@/pages/Homepage';
import Actividades from '@/pages/Actividades';
import Instalaciones from '@/pages/Instalaciones';
import Galeria from '@/pages/Galeria';
import SobreNosotros from '@/pages/SobreNosotros';
import Inscripcion from '@/pages/Inscripcion';
import Noticias from '@/components/home/Noticias';
import NotFound from '@pages/NotFound';

const App: React.FC = () => {
    return (
        <RouterProvider>
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
                                <Route
                                    path="/noticias"
                                    element={<Noticias />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Router>
                </GalleryProvider>
            </ContentProvider>
        </RouterProvider>
    );
};

export default App;
