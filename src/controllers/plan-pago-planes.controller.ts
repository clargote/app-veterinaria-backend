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
  Plan,
  PagoPlanes,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagoPlanesController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Array of Plan has many PagoPlanes',
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
    return this.planRepository.pagoPlanes(id).find(filter);
  }

  @post('/plans/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPlanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlanes, {
            title: 'NewPagoPlanesInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) pagoPlanes: Omit<PagoPlanes, 'id'>,
  ): Promise<PagoPlanes> {
    return this.planRepository.pagoPlanes(id).create(pagoPlanes);
  }

  @patch('/plans/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Plan.PagoPlanes PATCH success count',
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
    return this.planRepository.pagoPlanes(id).patch(pagoPlanes, where);
  }

  @del('/plans/{id}/pago-planes', {
    responses: {
      '200': {
        description: 'Plan.PagoPlanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPlanes)) where?: Where<PagoPlanes>,
  ): Promise<Count> {
    return this.planRepository.pagoPlanes(id).delete(where);
  }
}
