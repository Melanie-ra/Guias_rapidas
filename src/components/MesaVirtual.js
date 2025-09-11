import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faVideo, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MesaVirtual = ({ onBack }) => {
  const navigate = useNavigate();
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [visibleDocIndex, setVisibleDocIndex] = useState(null);

  const baseCards = [
    {
      title: 'Crear Cuenta',
      descrip: 'Regístrese para acceder al sistema',
      videoLink: './assets/video/CREAR_CUENTA.mp4',
      docLink: './assets/ManualMesaPartes.pdf',
      startPage: 4,
    },
    {
      title: 'Registrar Expediente',
      descrip: 'Ingrese un nuevo expediente al sistema',
      videoLink: './assets/video/REGISTRAR_EXPEDIENTE.mp4',
      docLink: './assets/ManualMesaPartes.pdf',
      startPage: 7,
    },
    {
      title: 'Consultar Expediente',
      descrip: 'Consulte sus expedientes registrados',
      videoLink: './assets/video/CONSULTAR_EXPEDIENTE.mp4',
      docLink: './assets/ManualMesaPartes.pdf',
      startPage: 15,
    },
  ];

  const [extraCards, setExtraCards] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem('tutos_1');
    if (stored) {
      const arr = JSON.parse(stored);
      const cards = arr.map(t => ({
        title: t.nombre,
        descrip: t.descripcion,
        videoLink: t.video,
        docLink: t.doc?.split('#')[0] || '',
        startPage: t.doc?.includes('#page=') ? Number(t.doc.split('#page=')[1]) : 1
      }));
      setExtraCards(cards);
    } else {
      setExtraCards([]);
    }
  }, []);

  const allCards = [...baseCards, ...extraCards];

  const openVideo = (index) => setVisibleVideoIndex(index);
  const closeVideo = () => setVisibleVideoIndex(null);

  const openDoc = (index) => setVisibleDocIndex(index);
  const closeDoc = () => setVisibleDocIndex(null);

  return (
    <div className=" bg-white p-4" style={{ minHeight: '25vh' }}>
      <div className="max-w-16xl mx-auto mt-8">
        <h2 className="subtitulos">Guías Rápidas de Mesa de Partes Virtual</h2>

        <div className="flex justify-start">
            <button
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    navigate('/inicio');
                  }
                }}
                className="btn-primary mt-4 mb-2"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Volver
            </button>
        </div>

        <div className="grid grid-cols-1 grid-cols-2 grid-cols-5 mt-2">
          {allCards.map((card, index) => (
            <div
              key={index}
              className="card"
            >
                <div className="btn-primary2">
                </div>
              <h3 className="text-lg font-semibold mb-2 mt-2 text-center" style={{ fontSize: '17px', fontWeight: '600' }}>{card.title}</h3>
              <p className="text-gray-600 mb-4 p-2 text-center">{card.descrip}</p>
              <div className="flex space-x-4 mb-0 mt-2 justify-center">
                <button
                  onClick={() => openVideo(index)}
                  className="btn-primary mb-2"
                >
                  <FontAwesomeIcon icon={faVideo} className="mr-2" />
                  Video
                </button>
                <button
                  onClick={() => openDoc(index)}
                  className="btn-primary mb-2"
                >
                  <FontAwesomeIcon icon={faBook} className="mr-2" />
                  Documentación
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleVideoIndex !== null && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="subtitulos mt-2">
                {allCards[visibleVideoIndex].title}
              </h2>
              <video
                controls
                className="video-container mb-4"
                src={allCards[visibleVideoIndex].videoLink}
                autoPlay
              >
                Tu navegador no soporta el elemento de video.
              </video>
              <button
                onClick={closeVideo}
                className="absolute bottom-2 right-2 btn-primary font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {visibleDocIndex !== null && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="subtitulos mt-2">
                {allCards[visibleDocIndex].title}
              </h2>
              <iframe
                src={`${allCards[visibleDocIndex].docLink}#page=${allCards[visibleDocIndex].startPage}`}
                className="pdf-container mb-4"
                title="Documento PDF"
              />
              <button
                onClick={closeDoc}
                className="absolute bottom-2 right-2 btn-primary font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesaVirtual;