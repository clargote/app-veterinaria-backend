import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Empleado, PagoPlanes, Cliente, ConsultaVeterinaria} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {PagoPlanesRepository} from './pago-planes.repository';
import {ClienteRepository} from './cliente.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.id>;

  public readonly pagoPlanes: HasManyRepositoryFactory<PagoPlanes, typeof Mascota.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>,
  ) {
    super(Mascota, dataSource);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.pagoPlanes = this.createHasManyRepositoryFactoryFor('pagoPlanes', pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPlanes', this.pagoPlanes.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
