import * as AuthComponent from './Auth';
import * as ImportComponent from './Import';
import * as MappingComponent from './Mapping';
import * as UserComponent from './User';

const routings = [...UserComponent.endpoints, ...AuthComponent.endpoints, ...MappingComponent.endpoints, ...ImportComponent.endpoints];

export { UserComponent, AuthComponent, MappingComponent, ImportComponent, routings };
