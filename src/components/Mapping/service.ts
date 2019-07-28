import { IMapping, Mapping } from './model';

export async function create(mapping: IMapping) {
  return Mapping.create(mapping);
}

export async function update(name: string, mapping: IMapping) {
  return Mapping.findOneAndUpdate({ name }, mapping);
}
export async function get(name: string) {
  return Mapping.findOne({ name });
}

export async function deactivate(name: string) {
  return Mapping.findOneAndUpdate({ name }, { isActive: false });
}
