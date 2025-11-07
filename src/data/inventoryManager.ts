// Sistema de gestión de estado para el inventario
import { 
  empresas, 
  sedes, 
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
    ubicaciones,
    variantes,
    modelos,
    marcas,
    politicas_modelo,
    tipos_movimiento
  };
}