import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Mascota} from './mascota.model';

@model()
export class PagoPlanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fechapago: string;

  @property({
    type: 'date',
    required: true,
  })
  formapago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<PagoPlanes>) {
    super(data);
  }
}

export interface PagoPlanesRelations {
  // describe navigational properties here
}

export type PagoPlanesWithRelations = PagoPlanes & PagoPlanesRelations;
