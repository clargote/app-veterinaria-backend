import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {Pedido} from './pedido.model';

@model()
export class DetallePedido extends Entity {
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

  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Pedido)
  pedidoId: string;

  constructor(data?: Partial<DetallePedido>) {
    super(data);
  }
}

export interface DetallePedidoRelations {
  // describe navigational properties here
}

export type DetallePedidoWithRelations = DetallePedido & DetallePedidoRelations;
