import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type Mycontext {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
}
