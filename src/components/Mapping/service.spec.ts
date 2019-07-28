import * as service from './service';
// tslint:disable:no-var-requires
const { Mapping } = require('./model');

describe('/mapping service', () => {
  describe('/create', () => {
    test('success', async () => {
      jest
        .spyOn(Mapping, 'create')
        .mockImplementation(() => Promise.resolve({}));
      await service.create(undefined);
    });
  });

  describe('/update', () => {
    test('success', async () => {
      jest
        .spyOn(Mapping, 'findOneAndUpdate')
        .mockImplementation(() => Promise.resolve({}));
      await service.update('', undefined);
    });
  });

  describe('/deactivate', () => {
    test('success', async () => {
      jest
        .spyOn(Mapping, 'findOneAndUpdate')
        .mockImplementation(() => Promise.resolve({}));
      await service.deactivate('');
    });
  });

  describe('/get', () => {
    test('success', async () => {
      jest
        .spyOn(Mapping, 'findOne')
        .mockImplementation(() => Promise.resolve({}));
      await service.get('');
    });
  });
});
