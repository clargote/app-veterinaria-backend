import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PagoPlanes,
  Plan,
} from '../models';
import {PagoPlanesRepository} from '../repositories';

export class PagoPlanesPlanController {
  constructor(
    @repository(PagoPlanesRepository)
    public pagoPlanesRepository: PagoPlanesRepository,
  ) { }

  @get('/pago-planes/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PagoPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof PagoPlanes.prototype.id,
  ): Promise<Plan> {
    return this.pagoPlanesRepository.plan(id);
  }
}
