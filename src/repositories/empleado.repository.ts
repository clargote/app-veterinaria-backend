import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Empleado, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
