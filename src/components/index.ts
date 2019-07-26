import * as AuthComponent from './Auth';
import * as UserComponent from './User';

const routings = [...UserComponent.endpoints, ...AuthComponent.endpoints];

export { UserComponent, AuthComponent, routings };
