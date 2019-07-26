import { IMapping, Mapping } from './model';

export async function create(mapping: IMapping) {
  return Mapping.create(mapping);
}

