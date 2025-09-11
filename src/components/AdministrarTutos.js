import React, { useState, useEffect } from 'react';
import { faEye, faVideo, faFilePdf, faSave, faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useNavigate } from 'react-router-dom';

const AdministrarTutos = ({ guias }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guia = guias?.find(g => String(g.id) === String(id));
  const [tutos, setTutos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', video: '', doc: '', startPage: 1 });
  const [videoFile, setVideoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState({ open: false, src: '' });
  const [showDocModal, setShowDocModal] = useState({ open: false, src: '', startPage: 1 });

  useEffect(() => {
    if (!guia) return;
    const key = `tutos_${guia.id}`;
    const mesaVirtualTutos = [
      {
        id: 1,
        nombre: 'Crear Cuenta',
        descripcion: 'Regístrese para acceder al sistema',
        video: './assets/video/CREAR_CUENTA.mp4',
        doc: './assets/ManualMesaPartes.pdf#page=4'
      },
      {
        id: 2,
        nombre: 'Registrar Expediente',
        descripcion: 'Ingrese un nuevo expediente al sistema',
        video: './assets/video/REGISTRAR_EXPEDIENTE.mp4',
        doc: './assets/ManualMesaPartes.pdf#page=7'
      },
      {
        id: 3,
        nombre: 'Consultar Expediente',
        descripcion: 'Consulte sus expedientes registrados',
        video: './assets/video/CONSULTAR_EXPEDIENTE.mp4',
        doc: './assets/ManualMesaPartes.pdf#page=15'
      }
    ];
    if (guia.ruta === '/mesadepartes' || guia.nombre.toLowerCase().includes('mesa')) {
      const stored = localStorage.getItem(key);
      let extraTutos = [];
      if (stored) {
        const arr = JSON.parse(stored);
        extraTutos = arr.filter(t => !mesaVirtualTutos.some(m => m.nombre === t.nombre));
      }
      setTutos([...mesaVirtualTutos, ...extraTutos]);
    } else {
      const stored = localStorage.getItem(key);
      if (stored) {
        setTutos(JSON.parse(stored));
      } else {
        setTutos([]);
      }
    }
  }, [guia]);

  useEffect(() => {
    if (!guia) return;
    const key = `tutos_${guia.id}`;
    if (guia.ruta === '/mesadepartes' || guia.nombre.toLowerCase().includes('mesa')) {
      const mesaVirtualNombres = ['Crear Cuenta', 'Registrar Expediente', 'Consultar Expediente'];
      const extraTutos = tutos.filter(t => !mesaVirtualNombres.includes(t.nombre));
      localStorage.setItem(key, JSON.stringify(extraTutos));
    } else {
      localStorage.setItem(key, JSON.stringify(tutos));
    }
  }, [tutos, guia]);

  const handleAddTuto = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) return;
    let videoUrl = form.video;
    let docUrl = form.doc;
    if (videoFile) {
      videoUrl = URL.createObjectURL(videoFile);
    }
    if (docFile) {
      docUrl = URL.createObjectURL(docFile);
    }
    if (!videoUrl || !docUrl) return;
    if (editId) {
      setTutos(tutos.map(t => t.id === editId ? { ...t, ...form, video: videoUrl, doc: docUrl, startPage: form.startPage } : t));
      setEditId(null);
    } else {
      if (guia.ruta === '/mesadepartes' || guia.nombre.toLowerCase().includes('mesa')) {
        const mesaVirtualNombres = ['Crear Cuenta', 'Registrar Expediente', 'Consultar Expediente'];
        if (mesaVirtualNombres.includes(form.nombre)) {
          alert('Este tutorial ya existe como base.');
          return;
        }
      }
      setTutos([
        ...tutos,
        {
          id: tutos.length ? Math.max(...tutos.map(t => t.id)) + 1 : 1,
          nombre: form.nombre,
          descripcion: form.descripcion,
          video: videoUrl,
          doc: docUrl,
          startPage: form.startPage
        }
      ]);
    }
    setForm({ nombre: '', descripcion: '', video: '', doc: '', startPage: 1 });
    setVideoFile(null);
    setDocFile(null);
  };

  const handleDelete = (id) => {
    setTutos(tutos.filter(t => t.id !== id));
  };

  const handleEdit = (tuto) => {
    setEditId(tuto.id);
    setForm({ nombre: tuto.nombre, descripcion: tuto.descripcion, video: tuto.video, doc: tuto.doc });
  };

  if (!guia) {
    return (
      <div className="p-6">
        <h2 className="subtitulos mt-6">Guía no encontrada</h2>
        <button className="btn-primary mb-4" onClick={() => navigate('/administrar')}> 
            <FontAwesomeIcon icon={faEye} /> Volver a Guías
            </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="subtitulos mt-6">Tutoriales de {guia.nombre}</h2>
      <button className="btn-primary mt-2" onClick={() => navigate('/administrar')}> <FontAwesomeIcon icon={faArrowLeft} /> Volver</button>
      <form onSubmit={handleAddTuto} className="mb-6 p-4 rounded" style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        <h3 className="subtitulos mb-4 mt-2" style={{ width: "97%" }}>
          {editId ? `Editar Tutorial ${form.nombre}` : "Agregar Nuevo Tutorial"}
        </h3>
        <div className="mb-2 flex items-center">
          <label className="ancho1" style={{ marginRight: "25px" }}>Nombre del tutorial:</label>
          <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="border ancho4" required />
        </div>
        <div className="mb-2 flex">
          <label className="ancho1" style={{ marginRight: "68px" }}>Descripción:</label>
          <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} className="border ancho3" required />
        </div>
        <div className="mb-2 flex items-center">
          <label className="ancho1" style={{ marginRight: "92px" }}>Video:</label>
          <label className="btn-primary" style={{ marginLeft: '21px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faVideo} />
            <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} style={{ display: 'none' }} />
          </label>
          {videoFile && (
            <button
              className="btn-primary ml-2"
              title="Ver video"
              type="button"
              onClick={() => setShowVideoModal({ open: true, src: URL.createObjectURL(videoFile) })}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          )}
        </div>
        <div className="mb-2 flex items-center">
          <label className="ancho1" style={{ marginRight: "7px" }}>Documentación (PDF):</label>
          <label className="btn-primary" style={{ marginLeft: '21px', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faFilePdf} />
            <input type="file" accept="application/pdf" onChange={e => setDocFile(e.target.files[0])} style={{ display: 'none' }} />
          </label>
          {docFile && (
            <button
              className="btn-primary ml-2"
              title="Ver documento"
              type="button"
              onClick={() => setShowDocModal({ open: true, src: URL.createObjectURL(docFile), startPage: form.startPage })}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          )}
        </div>
        <div className="mb-2 flex items-center">
          <label className="ancho1" style={{ marginRight: "34px" }}>Página inicial PDF:</label>
          <input type="number" min={1} value={form.startPage} onChange={e => setForm({ ...form, startPage: Number(e.target.value) })} className="border ancho4" />
        </div>
        <button type="submit" className="btn-primary">
          <FontAwesomeIcon icon={faSave} style={{ marginRight: '6px' }} />
          {editId ? "Guardar Cambios" : "Agregar"}
        </button>
      </form>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Nombre Tutorial</th>
            <th>Descripción</th>
            <th>Video</th>
            <th>Documentación</th>
            <th>Página inicial</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {tutos.map((tuto, idx) => (
            <tr key={tuto.id}>
              <td>{idx + 1}</td>
              <td>{tuto.nombre}</td>
              <td>{tuto.descripcion}</td>
              <td>{tuto.video}</td>
              <td>{tuto.doc}</td>
              <td>{
                (tuto.startPage !== undefined && tuto.startPage !== null)
                  ? tuto.startPage
                  : (tuto.doc && tuto.doc.includes('#page=')
                      ? Number(tuto.doc.split('#page=')[1])
                      : 1)
              }</td>
              <td>
                <button className="btn-primary" onClick={() => handleEdit(tuto)}> <FontAwesomeIcon icon={faEdit} /> </button>
              </td>
              <td>
                <button className="btn-primary" onClick={() => handleDelete(tuto.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    {/* Modal visor de video */}
    {showVideoModal.open && (
      <div className="modal" style={{ zIndex: 999 }}>
        <div className="modal-content" style={{ maxWidth: '600px', position: 'relative' }}>
          <h2 className="subtitulos mt-2">Visor de Video</h2>
          <video src={showVideoModal.src} controls autoPlay style={{ width: '100%', maxHeight: '60vh', borderRadius: '8px' }} />
          <button
            className="btn-primary font-bold absolute bottom-2 right-2"
            onClick={() => setShowVideoModal({ open: false, src: '' })}
          >Cerrar</button>
        </div>
      </div>
    )}
    {/* Modal visor de PDF */}
    {showDocModal.open && (
      <div className="modal" style={{ zIndex: 999 }}>
        <div className="modal-content" style={{ maxWidth: '800px', position: 'relative' }}>
          <h2 className="subtitulos mt-2">Visor de Documentación</h2>
          <iframe
            src={`${showDocModal.src}${showDocModal.src.includes('#page=') ? '' : `#page=${showDocModal.startPage}`}`}
            style={{ width: '100%', height: '70vh', borderRadius: '8px' }}
            title="PDF Visor"
          />
          <button
            className="btn-primary font-bold absolute bottom-2 right-2"
            onClick={() => setShowDocModal({ open: false, src: '', startPage: 1 })}
          >Cerrar</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default AdministrarTutos;
