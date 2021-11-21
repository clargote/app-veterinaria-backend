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
  Proveedor,
} from '../models';
import {ConsultaVeterinariaRepository} from '../repositories';

export class ConsultaVeterinariaProveedorController {
  constructor(
    @repository(ConsultaVeterinariaRepository)
    public consultaVeterinariaRepository: ConsultaVeterinariaRepository,
  ) { }

  @get('/consulta-veterinarias/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to ConsultaVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof ConsultaVeterinaria.prototype.id,
  ): Promise<Proveedor> {
    return this.consultaVeterinariaRepository.proveedor(id);
  }
}
