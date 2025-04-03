import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/layout/Layout';

import Homepage from '@/pages/Homepage';
import Actividades from '@/pages/Actividades';
import Instalaciones from '@/pages/Instalaciones';
import Galeria from '@/pages/Galeria';
import SobreNosotros from '@/pages/SobreNosotros';
import Inscripcion from '@/pages/Inscripcion';
import Noticias from '@/pages/Noticias';
import Login from '@pages/Login';
import Dashboard from '@pages/auth/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/actividades" element={<Actividades />} />
                    <Route path="/instalaciones" element={<Instalaciones />} />
                    <Route path="/galeria" element={<Galeria />} />
                    <Route path="/sobrenosotros" element={<SobreNosotros />} />
                    <Route path="/inscripcion" element={<Inscripcion />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/login" element={<Login />} />

                    {/* ✅ Ruta protegida correctamente */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
