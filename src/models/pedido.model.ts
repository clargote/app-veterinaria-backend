import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {PagoPlanes} from './pago-planes.model';
import {Cliente} from './cliente.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Pedido extends Entity {
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
  fechapedido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaentrega: string;

  @property({
    type: 'string',
    required: true,
  })
  formapago: string;

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

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => DetallePedido)
  detallePedidos: DetallePedido[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
