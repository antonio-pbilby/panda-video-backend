import { MongoClient } from 'mongodb';

import { config } from '@/config';
import { IDENTIFIERS, container } from '@/container';

export async function initializeMongoDB() {
  console.log('Starting connection to MongoDB');
  const connection = await MongoClient.connect(config.app.mongo);

  container
    .bind(IDENTIFIERS.USERS_COLLECTION)
    .toConstantValue(connection.db('auth').collection('users'));

  console.log('MongoDB connected');
}
