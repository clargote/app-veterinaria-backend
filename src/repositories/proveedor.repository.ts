import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, ConsultaVeterinaria, Producto} from '../models';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {ProductoRepository} from './producto.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Proveedor.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Proveedor, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
  }
}
