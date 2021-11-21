import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, DetallePedido} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {DetallePedidoRepository} from './detalle-pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.id>;

  public readonly detallePedidos: HasManyRepositoryFactory<DetallePedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.detallePedidos = this.createHasManyRepositoryFactoryFor('detallePedidos', detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('detallePedidos', this.detallePedidos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
