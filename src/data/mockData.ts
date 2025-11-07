// Mock data following database schema structure

export const metodos_rastreo = [
  {
    id: 1,
    codigo: 'SERIE'
  },
  {
    id: 2,
    codigo: 'LOTE'
  },
  {
    id: 3,
    codigo: 'NINGUNO'
  }
];

export const tipos_movimiento = [
  {
    id: 1,
    codigo: 'ENTRADA'
  },
  {
    id: 2,
    codigo: 'SALIDA'
  },
  {
    id: 3,
    codigo: 'TRASLADO'
  }
];

export const empresas = [
  {
    id: '1',
    nombre: 'Empresa Demo',
    nit: '123456789'
  }
];

export const sedes = [
  {
    id: '1',
    empresa_id: '1',
    nombre: 'Sede Principal',
    direccion: 'Calle Principal #123'
  },
  {
    id: '2',
    empresa_id: '1',
    nombre: 'Sede Secundaria',
    direccion: 'Avenida Central #456'
  }
];

export const almacenes = [
  {
    id: '1',
    sede_id: '1',
    nombre: 'Almacén Principal Sede 1'
  },
  {
    id: '2',
    sede_id: '2',
    nombre: 'Almacén Principal Sede 2'
  },
  {
    id: '3',
    sede_id: '1',
    nombre: 'Almacén Oficinas Sede 1'
  },
  {
    id: '4',
    sede_id: '2',
    nombre: 'Almacén Oficinas Sede 2'
  }
];

export const ubicaciones = [
  {
    id: '1',
    almacen_id: '1',
    codigo: 'A-001',
    tipo: 'ESTANTERIA'
  },
  {
    id: '2',
    almacen_id: '2',
    codigo: 'A-002',
    tipo: 'ESTANTERIA'
  },
  {
    id: '3',
    almacen_id: '3',
    codigo: 'OF-001',
    tipo: 'OFICINA'
  },
  {
    id: '4',
    almacen_id: '4',
    codigo: 'OF-002',
    tipo: 'OFICINA'
  },
  {
    id: '5',
    almacen_id: '1',
    codigo: 'A-003',
    tipo: 'GABINETE'
  },
  {
    id: '6',
    almacen_id: '2',
    codigo: 'A-004',
    tipo: 'GABINETE'
  }
];

export const marcas = [
  {
    id: '1',
    nombre: 'HP'
  },
  {
    id: '2',
    nombre: 'Epson'
  },
  {
    id: '3',
    nombre: 'OfiMuebles'
  },
  {
    id: '4',
    nombre: 'Dell'
  },
  {
    id: '5',
    nombre: 'Samsung'
  }
];

export const uom = [
  {
    id: '1',
    codigo: 'UND',
    nombre: 'Unidad'
  },
  {
    id: '2',
    codigo: 'SET',
    nombre: 'Set'
  }
];

export const tipos_item = [
  {
    id: 1,
    codigo: 'ACTIVO_FIJO'
  },
  {
    id: 2,
    codigo: 'CONSUMIBLE'
  }
];

export const modelos = [
  {
    id: '1',
    empresa_id: '1',
    marca_id: '1',
    modelo: 'Laptop ProBook',
    uom_id: '1',
    tipo_item_id: 1,
    familia_id: null
  },
  {
    id: '2',
    empresa_id: '1',
    marca_id: '2',
    modelo: 'Proyector PowerLite',
    uom_id: '1',
    tipo_item_id: 1,
    familia_id: null
  },
  {
    id: '3',
    empresa_id: '1',
    marca_id: '3',
    modelo: 'Silla Ergonómica Pro',
    uom_id: '1',
    tipo_item_id: 1,
    familia_id: null
  },
  {
    id: '4',
    empresa_id: '1',
    marca_id: '4',
    modelo: 'Monitor UltraSharp 27"',
    uom_id: '1',
    tipo_item_id: 1,
    familia_id: null
  },
  {
    id: '5',
    empresa_id: '1',
    marca_id: '5',
    modelo: 'Mouse Inalámbrico',
    uom_id: '1',
    tipo_item_id: 2,
    familia_id: null
  }
];

export const variantes = [
  {
    id: '1',
    modelo_id: '1',
    talla: null,
    color: 'Plateado',
    talla_norm: null,
    color_norm: 'plateado'
  },
  {
    id: '2',
    modelo_id: '2',
    talla: null,
    color: 'Negro',
    talla_norm: null,
    color_norm: 'negro'
  },
  {
    id: '3',
    modelo_id: '3',
    talla: null,
    color: 'Negro',
    talla_norm: null,
    color_norm: 'negro'
  },
  {
    id: '4',
    modelo_id: '4',
    talla: null,
    color: 'Negro',
    talla_norm: null,
    color_norm: 'negro'
  },
  {
    id: '5',
    modelo_id: '5',
    talla: null,
    color: 'Blanco',
    talla_norm: null,
    color_norm: 'blanco'
  }
];

export const activos = [
  {
    id: '1',
    variante_id: '1',
    serie: 'HP2024001',
    etiqueta: 'LAP-001',
    sede_id: '1',
    ubicacion_id: '3',
    fecha_compra: '2024-01-10',
    garantia_hasta: '2026-01-10'
  },
  {
    id: '2',
    variante_id: '2',
    serie: 'EP2023001',
    etiqueta: 'PROJ-001',
    sede_id: '1',
    ubicacion_id: '3',
    fecha_compra: '2023-09-15',
    garantia_hasta: '2024-09-15'
  },
  {
    id: '3',
    variante_id: '1',
    serie: 'HP2024002',
    etiqueta: 'LAP-002',
    sede_id: '2',
    ubicacion_id: '4',
    fecha_compra: '2024-02-20',
    garantia_hasta: '2026-02-20'
  },
  {
    id: '4',
    variante_id: '3',
    serie: 'OF2023001',
    etiqueta: 'SILLA-001',
    sede_id: '1',
    ubicacion_id: '3',
    fecha_compra: '2023-06-01',
    garantia_hasta: '2024-06-01'
  },
  {
    id: '5',
    variante_id: '4',
    serie: 'DL2024001',
    etiqueta: 'MON-001',
    sede_id: '1',
    ubicacion_id: '3',
    fecha_compra: '2024-03-15',
    garantia_hasta: '2027-03-15'
  },
  {
    id: '6',
    variante_id: '1',
    serie: 'HP2024003',
    etiqueta: 'LAP-003',
    sede_id: '1',
    ubicacion_id: '1',
    fecha_compra: '2024-01-10',
    garantia_hasta: '2026-01-10'
  }
];

export const movimientos_inventario = [
  {
    id: '1',
    empresa_id: '1',
    tipo_mov_id: 1, // ENTRADA
    ocurrido_el: '2024-01-10T10:00:00Z',
    realizado_por: null,
    sede_desde_id: null,
    ubic_desde_id: null,
    sede_hacia_id: '1',
    ubic_hacia_id: '1',
    activo_id: null,
    variante_id: '1',
    codigo_lote: null,
    cantidad: 5,
    motivo: 'Compra inicial de laptops HP',
    ref_tabla: null,
    ref_id: null
  },
  {
    id: '2',
    empresa_id: '1',
    tipo_mov_id: 1, // ENTRADA
    ocurrido_el: '2023-09-15T14:30:00Z',
    realizado_por: null,
    sede_desde_id: null,
    ubic_desde_id: null,
    sede_hacia_id: '1',
    ubic_hacia_id: '1',
    activo_id: null,
    variante_id: '2',
    codigo_lote: null,
    cantidad: 2,
    motivo: 'Compra inicial de proyectores',
    ref_tabla: null,
    ref_id: null
  },
  {
    id: '3',
    empresa_id: '1',
    tipo_mov_id: 3, // TRASLADO
    ocurrido_el: '2024-02-20T11:30:00Z',
    realizado_por: null,
    sede_desde_id: '1',
    ubic_desde_id: '1',
    sede_hacia_id: '2',
    ubic_hacia_id: '2',
    activo_id: null,
    variante_id: '1',
    codigo_lote: null,
    cantidad: 2,
    motivo: 'Traslado de equipos a sede secundaria',
    ref_tabla: null,
    ref_id: null
  },
  {
    id: '4',
    empresa_id: '1',
    tipo_mov_id: 2, // SALIDA
    ocurrido_el: '2024-03-15T09:00:00Z',
    realizado_por: null,
    sede_desde_id: '1',
    ubic_desde_id: '1',
    sede_hacia_id: null,
    ubic_hacia_id: null,
    activo_id: null,
    variante_id: '2',
    codigo_lote: null,
    cantidad: 1,
    motivo: 'Baja por daño irreparable',
    ref_tabla: null,
    ref_id: null
  }
];

export const politicas_modelo = [
  {
    id: '1',
    modelo_id: '1',
    metodo_rastreo_id: 1, // SERIE
    es_retornable: true,
    exige_inspeccion: true,
    dias_inspeccion: 180,
    exige_calibracion: false,
    dias_calibracion: null,
    dias_vida_util: 1825, // 5 años
    dias_max_asignacion: null,
    meses_garantia: 24
  },
  {
    id: '2',
    modelo_id: '2',
    metodo_rastreo_id: 1, // SERIE
    es_retornable: true,
    exige_inspeccion: true,
    dias_inspeccion: 90,
    exige_calibracion: false,
    dias_calibracion: null,
    dias_vida_util: 1095, // 3 años
    dias_max_asignacion: null,
    meses_garantia: 12
  },
  {
    id: '3',
    modelo_id: '3',
    metodo_rastreo_id: 1, // SERIE
    es_retornable: false,
    exige_inspeccion: false,
    dias_inspeccion: null,
    exige_calibracion: false,
    dias_calibracion: null,
    dias_vida_util: 3650, // 10 años
    dias_max_asignacion: null,
    meses_garantia: 12
  },
  {
    id: '4',
    modelo_id: '4',
    metodo_rastreo_id: 1, // SERIE
    es_retornable: true,
    exige_inspeccion: false,
    dias_inspeccion: null,
    exige_calibracion: false,
    dias_calibracion: null,
    dias_vida_util: 2555, // 7 años
    dias_max_asignacion: null,
    meses_garantia: 36
  },
  {
    id: '5',
    modelo_id: '5',
    metodo_rastreo_id: 2, // LOTE
    es_retornable: false,
    exige_inspeccion: false,
    dias_inspeccion: null,
    exige_calibracion: false,
    dias_calibracion: null,
    dias_vida_util: 730, // 2 años
    dias_max_asignacion: null,
    meses_garantia: 6
  }
];