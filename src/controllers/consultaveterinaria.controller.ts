import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ConsultaVeterinaria} from '../models';
import {ConsultaVeterinariaRepository} from '../repositories';

export class ConsultaveterinariaController {
  constructor(
    @repository(ConsultaVeterinariaRepository)
    public consultaVeterinariaRepository : ConsultaVeterinariaRepository,
  ) {}

  @post('/consulta-veterinarias')
  @response(200, {
    description: 'ConsultaVeterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConsultaVeterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {
            title: 'NewConsultaVeterinaria',
            exclude: ['id'],
          }),
        },
      },
    })
    consultaVeterinaria: Omit<ConsultaVeterinaria, 'id'>,
  ): Promise<ConsultaVeterinaria> {
    return this.consultaVeterinariaRepository.create(consultaVeterinaria);
  }

  @get('/consulta-veterinarias/count')
  @response(200, {
    description: 'ConsultaVeterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConsultaVeterinaria) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.consultaVeterinariaRepository.count(where);
  }

  @get('/consulta-veterinarias')
  @response(200, {
    description: 'Array of ConsultaVeterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConsultaVeterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConsultaVeterinaria) filter?: Filter<ConsultaVeterinaria>,
  ): Promise<ConsultaVeterinaria[]> {
    return this.consultaVeterinariaRepository.find(filter);
  }

  @patch('/consulta-veterinarias')
  @response(200, {
    description: 'ConsultaVeterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {partial: true}),
        },
      },
    })
    consultaVeterinaria: ConsultaVeterinaria,
    @param.where(ConsultaVeterinaria) where?: Where<ConsultaVeterinaria>,
  ): Promise<Count> {
    return this.consultaVeterinariaRepository.updateAll(consultaVeterinaria, where);
  }

  @get('/consulta-veterinarias/{id}')
  @response(200, {
    description: 'ConsultaVeterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConsultaVeterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ConsultaVeterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<ConsultaVeterinaria>
  ): Promise<ConsultaVeterinaria> {
    return this.consultaVeterinariaRepository.findById(id, filter);
  }

  @patch('/consulta-veterinarias/{id}')
  @response(204, {
    description: 'ConsultaVeterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVeterinaria, {partial: true}),
        },
      },
    })
    consultaVeterinaria: ConsultaVeterinaria,
  ): Promise<void> {
    await this.consultaVeterinariaRepository.updateById(id, consultaVeterinaria);
  }

  @put('/consulta-veterinarias/{id}')
  @response(204, {
    description: 'ConsultaVeterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consultaVeterinaria: ConsultaVeterinaria,
  ): Promise<void> {
    await this.consultaVeterinariaRepository.replaceById(id, consultaVeterinaria);
  }

  @del('/consulta-veterinarias/{id}')
  @response(204, {
    description: 'ConsultaVeterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consultaVeterinariaRepository.deleteById(id);
  }
}
