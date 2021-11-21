import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PagoPlanes, PagoPlanesRelations, Plan, Mascota} from '../models';
import {PlanRepository} from './plan.repository';
import {MascotaRepository} from './mascota.repository';

export class PagoPlanesRepository extends DefaultCrudRepository<
  PagoPlanes,
  typeof PagoPlanes.prototype.id,
  PagoPlanesRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof PagoPlanes.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagoPlanes.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(PagoPlanes, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
