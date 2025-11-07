// Sistema de gestión de estado para el inventario
import { 
  empresas, 
  sedes,
  almacenes, 
  ubicaciones, 
  variantes, 
  modelos, 
  marcas, 
  activos as activosIniciales, 
  movimientos_inventario as movimientosIniciales,
  politicas_modelo,
  tipos_movimiento
} from './mockData';

// Inicializar datos desde localStorage o usar datos iniciales
export function initData() {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem('scm_empresas')) {
    localStorage.setItem('scm_empresas', JSON.stringify(empresas));
  }
  
  if (!localStorage.getItem('scm_sedes')) {
    localStorage.setItem('scm_sedes', JSON.stringify(sedes));
  }

  if (!localStorage.getItem('scm_almacenes')) {
    localStorage.setItem('scm_almacenes', JSON.stringify(almacenes));
  }

  if (!localStorage.getItem('scm_ubicaciones')) {
    localStorage.setItem('scm_ubicaciones', JSON.stringify(ubicaciones));
  }

  if (!localStorage.getItem('scm_tipos_movimiento')) {
    localStorage.setItem('scm_tipos_movimiento', JSON.stringify(tipos_movimiento));
  }
  
  if (!localStorage.getItem('scm_activos')) {
    localStorage.setItem('scm_activos', JSON.stringify(activosIniciales));
  }
  
  if (!localStorage.getItem('scm_movimientos')) {
    localStorage.setItem('scm_movimientos', JSON.stringify(movimientosIniciales));
  }
}

// Obtener activos
export function getActivos() {
  if (typeof window === 'undefined') return activosIniciales;
  const data = localStorage.getItem('scm_activos');
  return data ? JSON.parse(data) : activosIniciales;
}

// Guardar activos
export function saveActivos(activos: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('scm_activos', JSON.stringify(activos));
}

// Agregar activo
export function addActivo(activo: any) {
  const activos = getActivos();
  const newActivo = {
    ...activo,
    id: Date.now().toString()
  };
  activos.push(newActivo);
  saveActivos(activos);
  return newActivo;
}

// Actualizar activo
export function updateActivo(id: string, updatedData: any) {
  const activos = getActivos();
  const index = activos.findIndex((a: any) => a.id === id);
  if (index !== -1) {
    activos[index] = { ...activos[index], ...updatedData };
    saveActivos(activos);
    return activos[index];
  }
  return null;
}

// Eliminar activo
export function deleteActivo(id: string) {
  const activos = getActivos();
  const filtered = activos.filter((a: any) => a.id !== id);
  saveActivos(filtered);
  return true;
}

// Obtener movimientos
export function getMovimientos() {
  if (typeof window === 'undefined') return movimientosIniciales;
  const data = localStorage.getItem('scm_movimientos');
  return data ? JSON.parse(data) : movimientosIniciales;
}

// Guardar movimientos
export function saveMovimientos(movimientos: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('scm_movimientos', JSON.stringify(movimientos));
}

// Agregar movimiento
export function addMovimiento(movimiento: any) {
  const movimientos = getMovimientos();
  const newMovimiento = {
    ...movimiento,
    id: Date.now().toString(),
    ocurrido_el: new Date().toISOString()
  };
  movimientos.push(newMovimiento);
  saveMovimientos(movimientos);
  return newMovimiento;
}

// Actualizar movimiento
export function updateMovimiento(id: string, updatedData: any) {
  const movimientos = getMovimientos();
  const index = movimientos.findIndex((m: any) => m.id === id);
  if (index !== -1) {
    movimientos[index] = { ...movimientos[index], ...updatedData };
    saveMovimientos(movimientos);
    return movimientos[index];
  }
  return null;
}

// Anular movimiento
export function anularMovimiento(id: string) {
  const movimientos = getMovimientos();
  const filtered = movimientos.filter((m: any) => m.id !== id);
  saveMovimientos(filtered);
  return true;
}

// Resetear datos
export function resetData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('scm_activos');
  localStorage.removeItem('scm_movimientos');
  initData();
}

// Obtener datos auxiliares
export function getMetadata() {
  return {
    empresas,
    sedes,
    almacenes,
    ubicaciones,
    variantes,
    modelos,
    marcas,
    politicas_modelo,
    tipos_movimiento
  };
}

// Gestión de Empresas
export function getEmpresas() {
  if (typeof window === 'undefined') return empresas;
  const data = localStorage.getItem('scm_empresas');
  return data ? JSON.parse(data) : empresas;
}

export function saveEmpresas(empresasData: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('scm_empresas', JSON.stringify(empresasData));
}

export function addEmpresa(empresa: any) {
  const empresasData = getEmpresas();
  const newEmpresa = {
    ...empresa,
    id: Date.now().toString(),
    nit_norm: empresa.nit ? empresa.nit.replace(/[^0-9]/g, '') : ''
  };
  empresasData.push(newEmpresa);
  saveEmpresas(empresasData);
  return newEmpresa;
}

export function updateEmpresa(id: string, updatedData: any) {
  const empresasData = getEmpresas();
  const index = empresasData.findIndex((e: any) => e.id === id);
  if (index !== -1) {
    empresasData[index] = { 
      ...empresasData[index], 
      ...updatedData,
      nit_norm: updatedData.nit ? updatedData.nit.replace(/[^0-9]/g, '') : empresasData[index].nit_norm
    };
    saveEmpresas(empresasData);
    return empresasData[index];
  }
  return null;
}

export function deleteEmpresa(id: string) {
  const empresasData = getEmpresas();
  const filtered = empresasData.filter((e: any) => e.id !== id);
  saveEmpresas(filtered);
  return true;
}

// Gestión de Sedes
export function getSedes() {
  if (typeof window === 'undefined') return sedes;
  const data = localStorage.getItem('scm_sedes');
  return data ? JSON.parse(data) : sedes;
}

export function saveSedes(sedesData: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('scm_sedes', JSON.stringify(sedesData));
}

export function addSede(sede: any) {
  const sedesData = getSedes();
  const newSede = {
    ...sede,
    id: Date.now().toString()
  };
  sedesData.push(newSede);
  saveSedes(sedesData);
  return newSede;
}

export function updateSede(id: string, updatedData: any) {
  const sedesData = getSedes();
  const index = sedesData.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    sedesData[index] = { 
      ...sedesData[index], 
      ...updatedData
    };
    saveSedes(sedesData);
    return sedesData[index];
  }
  return null;
}

export function deleteSede(id: string) {
  const sedesData = getSedes();
  const filtered = sedesData.filter((s: any) => s.id !== id);
  saveSedes(filtered);
  return true;
}