import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ConsultaVeterinaria, ConsultaVeterinariaRelations, Mascota, Proveedor} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ProveedorRepository} from './proveedor.repository';

export class ConsultaVeterinariaRepository extends DefaultCrudRepository<
  ConsultaVeterinaria,
  typeof ConsultaVeterinaria.prototype.id,
  ConsultaVeterinariaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVeterinaria.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof ConsultaVeterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(ConsultaVeterinaria, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
