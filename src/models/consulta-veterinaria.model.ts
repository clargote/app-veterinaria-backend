import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Proveedor} from './proveedor.model';

@model()
export class ConsultaVeterinaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechasolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaconsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  estadopago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<ConsultaVeterinaria>) {
    super(data);
  }
}

export interface ConsultaVeterinariaRelations {
  // describe navigational properties here
}

export type ConsultaVeterinariaWithRelations = ConsultaVeterinaria & ConsultaVeterinariaRelations;
