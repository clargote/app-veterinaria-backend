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
  Mascota,
  ConsultaVeterinaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaConsultaVeterinariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many ConsultaVeterinaria',
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
    return this.mascotaRepository.consultaVeterinarias(id).find(filter);
  }

  @post('/mascotas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaVeterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {
            title: 'NewConsultaVeterinariaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) consultaVeterinaria: Omit<ConsultaVeterinaria, 'id'>,
  ): Promise<ConsultaVeterinaria> {
    return this.mascotaRepository.consultaVeterinarias(id).create(consultaVeterinaria);
  }

  @patch('/mascotas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaVeterinaria PATCH success count',
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
    return this.mascotaRepository.consultaVeterinarias(id).patch(consultaVeterinaria, where);
  }

  @del('/mascotas/{id}/consulta-veterinarias', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaVeterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaVeterinaria)) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.mascotaRepository.consultaVeterinarias(id).delete(where);
  }
}
