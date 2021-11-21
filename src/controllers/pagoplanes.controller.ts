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
import {PagoPlanes} from '../models';
import {PagoPlanesRepository} from '../repositories';

export class PagoplanesController {
  constructor(
    @repository(PagoPlanesRepository)
    public pagoPlanesRepository : PagoPlanesRepository,
  ) {}

  @post('/pago-planes')
  @response(200, {
    description: 'PagoPlanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(PagoPlanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {
            title: 'NewPagoPlanes',
            exclude: ['id'],
          }),
        },
      },
    })
    pagoPlanes: Omit<PagoPlanes, 'id'>,
  ): Promise<PagoPlanes> {
    return this.pagoPlanesRepository.create(pagoPlanes);
  }

  @get('/pago-planes/count')
  @response(200, {
    description: 'PagoPlanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PagoPlanes) where?: Where<PagoPlanes>,
  ): Promise<Count> {
    return this.pagoPlanesRepository.count(where);
  }

  @get('/pago-planes')
  @response(200, {
    description: 'Array of PagoPlanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PagoPlanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PagoPlanes) filter?: Filter<PagoPlanes>,
  ): Promise<PagoPlanes[]> {
    return this.pagoPlanesRepository.find(filter);
  }

  @patch('/pago-planes')
  @response(200, {
    description: 'PagoPlanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {partial: true}),
        },
      },
    })
    pagoPlanes: PagoPlanes,
    @param.where(PagoPlanes) where?: Where<PagoPlanes>,
  ): Promise<Count> {
    return this.pagoPlanesRepository.updateAll(pagoPlanes, where);
  }

  @get('/pago-planes/{id}')
  @response(200, {
    description: 'PagoPlanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PagoPlanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PagoPlanes, {exclude: 'where'}) filter?: FilterExcludingWhere<PagoPlanes>
  ): Promise<PagoPlanes> {
    return this.pagoPlanesRepository.findById(id, filter);
  }

  @patch('/pago-planes/{id}')
  @response(204, {
    description: 'PagoPlanes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {partial: true}),
        },
      },
    })
    pagoPlanes: PagoPlanes,
  ): Promise<void> {
    await this.pagoPlanesRepository.updateById(id, pagoPlanes);
  }

  @put('/pago-planes/{id}')
  @response(204, {
    description: 'PagoPlanes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagoPlanes: PagoPlanes,
  ): Promise<void> {
    await this.pagoPlanesRepository.replaceById(id, pagoPlanes);
  }

  @del('/pago-planes/{id}')
  @response(204, {
    description: 'PagoPlanes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagoPlanesRepository.deleteById(id);
  }
}
