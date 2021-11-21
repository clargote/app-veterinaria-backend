import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {DetallePedido, DetallePedidoRelations, Producto, Pedido} from '../models';
import {ProductoRepository} from './producto.repository';
import {PedidoRepository} from './pedido.repository';

export class DetallePedidoRepository extends DefaultCrudRepository<
  DetallePedido,
  typeof DetallePedido.prototype.id,
  DetallePedidoRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof DetallePedido.prototype.id>;

  public readonly pedido: BelongsToAccessor<Pedido, typeof DetallePedido.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(DetallePedido, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
