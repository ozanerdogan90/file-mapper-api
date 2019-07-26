import { IMapping, Mapping } from './model';

export async function create(mapping: IMapping) {
  return Mapping.create(mapping);
}

export async function remove(name: string) {
  return Mapping.findOneAndUpdate({ name }, { isActive: false });
}
