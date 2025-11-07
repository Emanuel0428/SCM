-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE scm.activos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  variante_id uuid NOT NULL,
  serie text NOT NULL,
  etiqueta text,
  sede_id uuid,
  ubicacion_id uuid,
  fecha_compra date,
  garantia_hasta date,
  CONSTRAINT activos_pkey PRIMARY KEY (id),
  CONSTRAINT activos_variante_id_fkey FOREIGN KEY (variante_id) REFERENCES scm.variantes(id),
  CONSTRAINT activos_sede_id_fkey FOREIGN KEY (sede_id) REFERENCES scm.sedes(id),
  CONSTRAINT activos_ubicacion_id_fkey FOREIGN KEY (ubicacion_id) REFERENCES scm.ubicaciones(id)
);
CREATE TABLE scm.almacenes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  sede_id uuid NOT NULL,
  nombre text NOT NULL,
  CONSTRAINT almacenes_pkey PRIMARY KEY (id),
  CONSTRAINT almacenes_sede_id_fkey FOREIGN KEY (sede_id) REFERENCES scm.sedes(id)
);
CREATE TABLE scm.asignacion_det (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  asignacion_id uuid NOT NULL,
  activo_id uuid,
  variante_id uuid,
  codigo_lote text,
  cantidad numeric CHECK (cantidad IS NULL OR cantidad > 0::numeric),
  CONSTRAINT asignacion_det_pkey PRIMARY KEY (id),
  CONSTRAINT asignacion_det_asignacion_id_fkey FOREIGN KEY (asignacion_id) REFERENCES scm.asignaciones(id)
);
CREATE TABLE scm.asignaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  colaborador_id uuid NOT NULL,
  asignada_el timestamp with time zone NOT NULL DEFAULT now(),
  creada_por uuid,
  notas text,
  CONSTRAINT asignaciones_pkey PRIMARY KEY (id),
  CONSTRAINT asignaciones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id),
  CONSTRAINT asignaciones_colaborador_id_fkey FOREIGN KEY (colaborador_id) REFERENCES scm.colaboradores(id),
  CONSTRAINT asignaciones_creada_por_fkey FOREIGN KEY (creada_por) REFERENCES scm.perfiles(usuario_id)
);
CREATE TABLE scm.colaboradores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  documento text,
  documento_norm text DEFAULT regexp_replace(btrim(COALESCE(documento, ''::text)), '[^0-9]'::text, ''::text, 'g'::text),
  nombre text NOT NULL,
  area text,
  activo boolean NOT NULL DEFAULT true,
  CONSTRAINT colaboradores_pkey PRIMARY KEY (id),
  CONSTRAINT colaboradores_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id)
);
CREATE TABLE scm.empresas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  nit text,
  nit_norm text DEFAULT regexp_replace(btrim(COALESCE(nit, ''::text)), '[^0-9]'::text, ''::text, 'g'::text),
  CONSTRAINT empresas_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.marcas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  CONSTRAINT marcas_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.metodos_rastreo (
  id integer NOT NULL DEFAULT nextval('scm.metodos_rastreo_id_seq'::regclass),
  codigo text NOT NULL UNIQUE,
  CONSTRAINT metodos_rastreo_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.miembros_empresa (
  empresa_id uuid NOT NULL,
  usuario_id uuid NOT NULL,
  rol USER-DEFINED NOT NULL DEFAULT 'CONSULTOR'::scm.rol_empresa,
  CONSTRAINT miembros_empresa_pkey PRIMARY KEY (empresa_id, usuario_id),
  CONSTRAINT miembros_empresa_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id),
  CONSTRAINT miembros_empresa_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES scm.perfiles(usuario_id)
);
CREATE TABLE scm.modelos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  familia_id uuid,
  marca_id uuid,
  modelo text NOT NULL,
  uom_id uuid NOT NULL,
  tipo_item_id integer NOT NULL,
  CONSTRAINT modelos_pkey PRIMARY KEY (id),
  CONSTRAINT modelos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id),
  CONSTRAINT modelos_marca_id_fkey FOREIGN KEY (marca_id) REFERENCES scm.marcas(id),
  CONSTRAINT modelos_uom_id_fkey FOREIGN KEY (uom_id) REFERENCES scm.uom(id),
  CONSTRAINT modelos_tipo_item_id_fkey FOREIGN KEY (tipo_item_id) REFERENCES scm.tipos_item(id)
);
CREATE TABLE scm.movimientos_inventario (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  tipo_mov_id integer NOT NULL,
  ocurrido_el timestamp with time zone NOT NULL DEFAULT now(),
  realizado_por uuid,
  sede_desde_id uuid,
  ubic_desde_id uuid,
  sede_hacia_id uuid,
  ubic_hacia_id uuid,
  activo_id uuid,
  variante_id uuid,
  codigo_lote text,
  cantidad numeric NOT NULL CHECK (cantidad > 0::numeric),
  motivo text,
  ref_tabla text,
  ref_id uuid,
  CONSTRAINT movimientos_inventario_pkey PRIMARY KEY (id),
  CONSTRAINT movimientos_inventario_tipo_mov_id_fkey FOREIGN KEY (tipo_mov_id) REFERENCES scm.tipos_movimiento(id),
  CONSTRAINT movimientos_inventario_realizado_por_fkey FOREIGN KEY (realizado_por) REFERENCES scm.perfiles(usuario_id),
  CONSTRAINT movimientos_inventario_sede_desde_id_fkey FOREIGN KEY (sede_desde_id) REFERENCES scm.sedes(id),
  CONSTRAINT movimientos_inventario_ubic_desde_id_fkey FOREIGN KEY (ubic_desde_id) REFERENCES scm.ubicaciones(id),
  CONSTRAINT movimientos_inventario_sede_hacia_id_fkey FOREIGN KEY (sede_hacia_id) REFERENCES scm.sedes(id),
  CONSTRAINT movimientos_inventario_ubic_hacia_id_fkey FOREIGN KEY (ubic_hacia_id) REFERENCES scm.ubicaciones(id),
  CONSTRAINT movimientos_inventario_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id)
);
CREATE TABLE scm.ordenes_mantenimiento (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  creado_por uuid,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['PREVENTIVO'::text, 'CORRECTIVO'::text])),
  estado text NOT NULL DEFAULT 'PENDIENTE'::text CHECK (estado = ANY (ARRAY['PENDIENTE'::text, 'EN_PROCESO'::text, 'REALIZADO'::text, 'ANULADO'::text])),
  activo_id uuid,
  variante_id uuid,
  codigo_lote text,
  descripcion text,
  programado_el date,
  realizado_el date,
  resultado text,
  costo numeric,
  CONSTRAINT ordenes_mantenimiento_pkey PRIMARY KEY (id),
  CONSTRAINT ordenes_mantenimiento_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id),
  CONSTRAINT ordenes_mantenimiento_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES scm.perfiles(usuario_id)
);
CREATE TABLE scm.perfiles (
  usuario_id uuid NOT NULL,
  nombre_completo text,
  creado_el timestamp with time zone DEFAULT now(),
  CONSTRAINT perfiles_pkey PRIMARY KEY (usuario_id),
  CONSTRAINT perfiles_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE scm.politicas_modelo (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  modelo_id uuid NOT NULL UNIQUE,
  metodo_rastreo_id integer NOT NULL,
  es_retornable boolean NOT NULL DEFAULT false,
  exige_inspeccion boolean NOT NULL DEFAULT false,
  dias_inspeccion integer CHECK (dias_inspeccion IS NULL OR dias_inspeccion >= 0),
  exige_calibracion boolean NOT NULL DEFAULT false,
  dias_calibracion integer CHECK (dias_calibracion IS NULL OR dias_calibracion >= 0),
  dias_vida_util integer CHECK (dias_vida_util IS NULL OR dias_vida_util >= 0),
  dias_max_asignacion integer CHECK (dias_max_asignacion IS NULL OR dias_max_asignacion >= 0),
  meses_garantia integer NOT NULL DEFAULT 0 CHECK (meses_garantia >= 0),
  CONSTRAINT politicas_modelo_pkey PRIMARY KEY (id),
  CONSTRAINT politicas_modelo_modelo_id_fkey FOREIGN KEY (modelo_id) REFERENCES scm.modelos(id),
  CONSTRAINT politicas_modelo_metodo_rastreo_id_fkey FOREIGN KEY (metodo_rastreo_id) REFERENCES scm.metodos_rastreo(id)
);
CREATE TABLE scm.proveedores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  nombre text NOT NULL,
  nit text,
  nit_norm text DEFAULT regexp_replace(btrim(COALESCE(nit, ''::text)), '[^0-9]'::text, ''::text, 'g'::text),
  CONSTRAINT proveedores_pkey PRIMARY KEY (id),
  CONSTRAINT proveedores_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id)
);
CREATE TABLE scm.recepcion_det (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  recepcion_id uuid NOT NULL,
  variante_id uuid,
  sede_id uuid NOT NULL,
  ubicacion_id uuid NOT NULL,
  codigo_lote text,
  cant_recibida numeric NOT NULL CHECK (cant_recibida > 0::numeric),
  cant_aceptada numeric NOT NULL CHECK (cant_aceptada >= 0::numeric),
  cant_rechazada numeric NOT NULL CHECK (cant_rechazada >= 0::numeric),
  motivo_rechazo text,
  CONSTRAINT recepcion_det_pkey PRIMARY KEY (id),
  CONSTRAINT recepcion_det_recepcion_id_fkey FOREIGN KEY (recepcion_id) REFERENCES scm.recepciones(id),
  CONSTRAINT recepcion_det_variante_id_fkey FOREIGN KEY (variante_id) REFERENCES scm.variantes(id),
  CONSTRAINT recepcion_det_sede_id_fkey FOREIGN KEY (sede_id) REFERENCES scm.sedes(id),
  CONSTRAINT recepcion_det_ubicacion_id_fkey FOREIGN KEY (ubicacion_id) REFERENCES scm.ubicaciones(id)
);
CREATE TABLE scm.recepciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  recibida_el timestamp with time zone NOT NULL DEFAULT now(),
  recibida_por uuid,
  notas text,
  proveedor_id uuid,
  doc_referencia text,
  CONSTRAINT recepciones_pkey PRIMARY KEY (id),
  CONSTRAINT recepciones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id),
  CONSTRAINT recepciones_recibida_por_fkey FOREIGN KEY (recibida_por) REFERENCES scm.perfiles(usuario_id),
  CONSTRAINT recepciones_proveedor_id_fkey FOREIGN KEY (proveedor_id) REFERENCES scm.proveedores(id)
);
CREATE TABLE scm.sedes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  nombre text NOT NULL,
  direccion text,
  CONSTRAINT sedes_pkey PRIMARY KEY (id),
  CONSTRAINT sedes_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES scm.empresas(id)
);
CREATE TABLE scm.tipos_item (
  id integer NOT NULL DEFAULT nextval('scm.tipos_item_id_seq'::regclass),
  codigo text NOT NULL UNIQUE,
  CONSTRAINT tipos_item_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.tipos_movimiento (
  id integer NOT NULL DEFAULT nextval('scm.tipos_movimiento_id_seq'::regclass),
  codigo text NOT NULL UNIQUE,
  CONSTRAINT tipos_movimiento_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.ubicaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  almacen_id uuid NOT NULL,
  codigo text NOT NULL,
  tipo text,
  CONSTRAINT ubicaciones_pkey PRIMARY KEY (id),
  CONSTRAINT ubicaciones_almacen_id_fkey FOREIGN KEY (almacen_id) REFERENCES scm.almacenes(id)
);
CREATE TABLE scm.uom (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  codigo text NOT NULL UNIQUE,
  nombre text NOT NULL,
  CONSTRAINT uom_pkey PRIMARY KEY (id)
);
CREATE TABLE scm.variantes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  modelo_id uuid NOT NULL,
  talla text,
  color text,
  talla_norm text DEFAULT lower(COALESCE(talla, ''::text)),
  color_norm text DEFAULT lower(COALESCE(color, ''::text)),
  CONSTRAINT variantes_pkey PRIMARY KEY (id),
  CONSTRAINT variantes_modelo_id_fkey FOREIGN KEY (modelo_id) REFERENCES scm.modelos(id)
);