import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  ConsultaVeterinaria,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorConsultaVeterinariaController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many ConsultaVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConsultaVeterinaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ConsultaVeterinaria>,
  ): Promise<ConsultaVeterinaria[]> {
    return this.proveedorRepository.consultaVeterinarias(id).find(filter);
  }

  @post('/proveedors/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaVeterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {
            title: 'NewConsultaVeterinariaInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) consultaVeterinaria: Omit<ConsultaVeterinaria, 'id'>,
  ): Promise<ConsultaVeterinaria> {
    return this.proveedorRepository.consultaVeterinarias(id).create(consultaVeterinaria);
  }

  @patch('/proveedors/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaVeterinaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {partial: true}),
        },
      },
    })
    consultaVeterinaria: Partial<ConsultaVeterinaria>,
    @param.query.object('where', getWhereSchemaFor(ConsultaVeterinaria)) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaVeterinarias(id).patch(consultaVeterinaria, where);
  }

  @del('/proveedors/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaVeterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaVeterinaria)) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaVeterinarias(id).delete(where);
  }
}
