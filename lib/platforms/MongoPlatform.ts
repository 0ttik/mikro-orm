import { ObjectID } from 'mongodb';
import { Platform } from './Platform';
import { MongoNamingStrategy, NamingStrategy } from '../naming-strategy';
import { IPrimaryKey } from '../decorators';

export class MongoPlatform extends Platform {

  usesPivotTable(): boolean {
    return false;
  }

  supportsTransactions(): boolean {
    return false;
  }

  getNamingStrategy(): { new(): NamingStrategy} {
    return MongoNamingStrategy;
  }

  normalizePrimaryKey<T = number | string>(data: IPrimaryKey | ObjectID): T {
    if (data instanceof ObjectID) {
      return data.toHexString() as unknown as T;
    }

    return data as unknown as T;
  }

  denormalizePrimaryKey(data: number | string): IPrimaryKey {
    return new ObjectID(data);
  }

  getSerializedPrimaryKeyField(field: string): string {
    return 'id';
  }

}
