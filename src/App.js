import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GuiasRapidas from './components/GuiasRapidas';
import MesaVirtual from './components/MesaVirtual';
import GestionDocumental from './components/GestionDocumental';
import GestionContenido from './components/GestionContenido';
import Mantenimiento from './components/Mantenimiento';
import AdministrarGuias from './components/AdministrarGuias';
import AdministrarTutos from './components/AdministrarTutos';

const initialGuias = [
  {
    id: 1,
    nombre: 'Mesa de Partes Virtual',
    descripcion: 'Accede a la guía de uso del Sistema de Mesa de Partes Virtual y conoce cómo registrar y consultar tus documentos rápido.',
    ruta: '/mesadepartes',
    suspendida: false
  },
  {
    id: 2,
    nombre: 'Sistema de Gestión Documental',
    descripcion: 'Accede a la guía de uso del trámite Documentario y conoce más con la guía rápida sobre el sistema de manera sencilla.',
    ruta: '/gestion-documentaria',
    suspendida: false
  },
  {
    id: 3,
    nombre: 'Sistema de Gestión de Contenidos',
    descripcion: 'Accede a la guía de uso del Sistema de Gestión de Contenidos y conoce más con la guía rápida de manera sencilla.',
    ruta: '/gestion-contenidos',
    suspendida: false
  },
  {
    id: 4,
    nombre: 'Sistema de Mantenimiento',
    descripcion: 'Accede a la guía de uso del Sistema de Mantenimiento y conoce cómo registrar y consultar tus documentos rápido.',
    ruta: '/mantenimiento',
    suspendida: false
  }
];

function App() {
  const fechaActualizada = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Estado compartido de guías rápidas, cargado desde localStorage o initialGuias
  const [guias, setGuias] = useState(() => {
    const stored = localStorage.getItem("guias");
    return stored ? JSON.parse(stored) : initialGuias;
  });

  // Guardar en localStorage cada vez que cambie guias
  useEffect(() => {
    localStorage.setItem("guias", JSON.stringify(guias));
  }, [guias]);

  return (
    <Router>
      <div className="App">
        <div
          style={{
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 1037,
            height: '2.5rem',
            background: '#99020B',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            justifyContent: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/img/uni_blanco.ico"
              style={{ width: '2rem', marginLeft: '1rem' }}
              alt="logouni"
            />
            <img
              src="/assets/img/slasch.ico"
              style={{ width: '2rem', marginLeft: '0rem' }}
              alt="logouni"
            />
            <div
              style={{
                marginLeft: '0rem',
                verticalAlign: 'middle',
                fontFamily: 'Segoe UI'
              }}
            >
              <span style={{
                color: 'white',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                UNI - GUÍAS RÁPIDAS - {fechaActualizada}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Routes>
            <Route path="/inicio" element={<GuiasRapidas guias={guias} />} />
            <Route path="/mesadepartes" element={<MesaVirtual />} />
            <Route path="/gestion-documentaria" element={<GestionDocumental />} />
            <Route path="/gestion-contenidos" element={<GestionContenido />} />
            <Route path="/mantenimiento" element={<Mantenimiento />} />
            <Route path="/administrar" element={<AdministrarGuias guias={guias} setGuias={setGuias} />} />
            <Route path="/tutoriales/:id" element={<AdministrarTutos guias={guias} />} />
            <Route path="/" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
