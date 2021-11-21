import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Mascota, Pedido} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PedidoRepository} from './pedido.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Cliente, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
