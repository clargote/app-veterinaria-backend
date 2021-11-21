import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ConsultaVeterinaria,
  Mascota,
} from '../models';
import {ConsultaVeterinariaRepository} from '../repositories';

export class ConsultaVeterinariaMascotaController {
  constructor(
    @repository(ConsultaVeterinariaRepository)
    public consultaVeterinariaRepository: ConsultaVeterinariaRepository,
  ) { }

  @get('/consulta-veterinarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to ConsultaVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof ConsultaVeterinaria.prototype.id,
  ): Promise<Mascota> {
    return this.consultaVeterinariaRepository.mascota(id);
  }
}
