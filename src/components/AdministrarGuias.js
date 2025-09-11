import React, { useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const AdministrarGuias = ({ guias, setGuias }) => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', ruta: '' });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const handleAddGuia = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim() || !form.ruta.trim()) return;

    if (editId) {
      setGuias(guias.map(g => g.id === editId ? { ...g, ...form } : g));
      setEditId(null);
    } else {
      setGuias([
        ...guias,
        {
          id: guias.length ? Math.max(...guias.map(g => g.id)) + 1 : 1,
          nombre: form.nombre,
          descripcion: form.descripcion,
          ruta: form.ruta,
          suspendida: false
        }
      ]);
    }

    setForm({ nombre: '', descripcion: '', ruta: '' });
  };

  const handleDelete = (id) => {
    setGuias(guias.filter(g => g.id !== id));
  };

  const handleSuspend = (id) => {
    setGuias(guias.map(g => g.id === id ? { ...g, suspendida: !g.suspendida } : g));
  };

  const handleEdit = (guia) => {
    setEditId(guia.id);
    setForm({ nombre: guia.nombre, descripcion: guia.descripcion, ruta: guia.ruta });
  };

  return (
    <div className="p-6 ">
      <h2 className="subtitulos mt-6">Administrar Guías Rápidas</h2>      
      <form onSubmit={handleAddGuia} 
        className="mb-6 p-4 rounded"
        style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}
      >
        <h3 className="subtitulos mb-4 mt-2" style={{ width: "95%" }}>
          {editId 
            ? `Editar Guía ${form.nombre}` 
            : "Agregar Nueva Guía"}
        </h3>
        <div className="mb-2 flex items-center">
            <label className="ancho1" style={{ marginRight: "6px" }}>Nombre del sistema:</label>
            <input
                type="text"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="border ancho2"
                required
            />
            <label className="ancho1" style={{ marginLeft: "15px" }}>Ruta del sistema:</label>
                <input
                    type="text"
                    value={form.ruta}
                    onChange={e => setForm({ ...form, ruta: e.target.value })}
                    placeholder="Ej: /mesadepartes"
                    className="border ancho2"
                    required
                />
        </div>

        <div className="mb-2 flex">
            <label className="ancho1" style={{ marginRight: "50px" }}>Descripción:</label>
            <textarea
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                className="border ancho3"
                required
            />
        </div>
        <button type="submit" className="btn-primary">
          {editId ? "Guardar Cambios" : "Agregar"}
        </button>
      </form>

      <table className="custom-table">
        <thead>
            <tr>
            <th>Ítem</th>
            <th>Nombre Guía</th>
            <th>Descripción</th>
            <th>Ruta</th>
            <th>Editar</th>
            <th>Eliminar</th>
            <th>Suspender</th>
            </tr>
        </thead>
        <tbody>
            {guias.map((guia, idx) => (
            <tr key={guia.id} className={guia.suspendida ? 'bg-red-100' : ''}>
                <td>{idx + 1}</td>
                <td>
                  <button
                    className="btn-link"
                    style={{ color: '#007bff', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => navigate(`/tutoriales/${guia.id}`)}
                  >
                    {guia.nombre}
                  </button>
                </td>
                <td>{guia.descripcion}</td>
                <td>{guia.ruta}</td>
                <td>
                  <button className="btn-primary" onClick={() => handleEdit(guia)}><FontAwesomeIcon icon={faEdit} /></button>
                </td>
                <td>
                  <button className="btn-primary" onClick={() => handleDelete(guia.id)}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
                <td>
                  <button className="btn-primary" onClick={() => handleSuspend(guia.id)}>
                      {guia.suspendida ? 'Activar' : 'Suspender'}
                  </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default AdministrarGuias;
