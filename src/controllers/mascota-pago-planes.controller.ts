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
  PagoPlanes,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagoPlanesController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PagoPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PagoPlanes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PagoPlanes>,
  ): Promise<PagoPlanes[]> {
    return this.mascotaRepository.pagoPlanes(id).find(filter);
  }

  @post('/mascotas/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPlanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {
            title: 'NewPagoPlanesInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagoPlanes: Omit<PagoPlanes, 'id'>,
  ): Promise<PagoPlanes> {
    return this.mascotaRepository.pagoPlanes(id).create(pagoPlanes);
  }

  @patch('/mascotas/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Mascota.PagoPlanes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {partial: true}),
        },
      },
    })
    pagoPlanes: Partial<PagoPlanes>,
    @param.query.object('where', getWhereSchemaFor(PagoPlanes)) where?: Where<PagoPlanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPlanes(id).patch(pagoPlanes, where);
  }

  @del('/mascotas/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Mascota.PagoPlanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPlanes)) where?: Where<PagoPlanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPlanes(id).delete(where);
  }
}
