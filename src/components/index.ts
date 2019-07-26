import * as AuthComponent from './Auth';
import AuthComponentRouting from './Auth/routing';
import * as UserComponent from './User';
import UserComponentRouting from './User/routing';

const routings = [...UserComponentRouting, ...AuthComponentRouting];

export { UserComponent, AuthComponent, routings };
