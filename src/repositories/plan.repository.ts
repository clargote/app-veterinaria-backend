import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Plan, PlanRelations, PagoPlanes} from '../models';
import {PagoPlanesRepository} from './pago-planes.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly pagoPlanes: HasManyRepositoryFactory<PagoPlanes, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>,
  ) {
    super(Plan, dataSource);
    this.pagoPlanes = this.createHasManyRepositoryFactoryFor('pagoPlanes', pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPlanes', this.pagoPlanes.inclusionResolver);
  }
}
