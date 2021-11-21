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
  Mascota,
} from '../models';
import {PagoPlanesRepository} from '../repositories';

export class PagoPlanesMascotaController {
  constructor(
    @repository(PagoPlanesRepository)
    public pagoPlanesRepository: PagoPlanesRepository,
  ) { }

  @get('/pago-planes/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to PagoPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PagoPlanes.prototype.id,
  ): Promise<Mascota> {
    return this.pagoPlanesRepository.mascota(id);
  }
}
