import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MesaVirtual from './MesaVirtual';
import { faBookOpen, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GuiasRapidas = ({ guias }) => {
  const navigate = useNavigate();
  const [selectedSystem, setSelectedSystem] = useState(null);

  const handleSystemSelect = (guia) => {
    if (guia.ruta) {
      navigate(guia.ruta);
    } else {
      setSelectedSystem('desarrollo');
    }
  };

  const handleBack = () => {
    setSelectedSystem(null);
  };

  if (selectedSystem === 'mesa-virtual') {
    return <MesaVirtual onBack={handleBack} />;
  }

  if (selectedSystem) {
    return (
      <div className=" bg-white p-4" style={{ minHeight: '25vh' }}>
        <div className="max-w-16xl mx-auto mt-8">
          <h2 className="subtitulos">Sistema en Desarrollo</h2>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Las guías para este sistema estarán disponibles próximamente.
            </p>
            <button
              onClick={handleBack}
              className="btn-primary"
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
              Volver a Guías Rápidas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-12'>
      <h2 className="subtitulos">Guías Rápidas</h2>
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 mt-2 p-2" style={{ minHeight: '22vh' }}>
        {guias.filter(g => !g.suspendida).map((guia) => (
          <div
            key={guia.id}
            className="card w-full"
            onClick={() => handleSystemSelect(guia)}
            style={{ cursor: 'pointer' }}
          >
            <div className="btn-primary2"></div>
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="flex items-center flex-1 min-w-0">
                <FontAwesomeIcon icon={faFile} className="mr-2 icon" />
                <h3 className="mb-2 mt-2" style={{ fontSize: '17px', fontWeight: '600' }}>
                  {guia.nombre}
                </h3>
              </div>
              <label className="btn-primary3">Trámite</label>
            </div>

            <p className="text-gray-600 mb-4" style={{ padding: '0.8rem 2rem' }}>{guia.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuiasRapidas;
