import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faVideo, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GestionDocumental = ({ onBack }) => {
    const navigate = useNavigate();

    return (
        <div className=" bg-white p-4" style={{ minHeight: '25vh' }}>
            <div className="max-w-16xl mx-auto mt-8">
                <h2 className="subtitulos">Guías Rápidas del Sistema de Gestión Documental</h2>
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
            </div>
        </div>
    );
};

export default GestionDocumental;
