import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {PagoPlanes} from './pago-planes.model';
import {Cliente} from './cliente.model';
import {ConsultaVeterinaria} from './consulta-veterinaria.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechanacimiento: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => PagoPlanes)
  pagoPlanes: PagoPlanes[];

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => ConsultaVeterinaria)
  consultaVeterinarias: ConsultaVeterinaria[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
