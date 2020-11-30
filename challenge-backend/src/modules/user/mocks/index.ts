import * as moment from 'moment';
import * as uuid from 'uuid';

import { UserRole } from '../user.entity';

const now = moment().unix();

export const usersResponse = {
  data: [
    {
      id: uuid.v4(),
      name: 'Teste 1',
      email: 'teste1@teste.com',
      role: UserRole.PATIENT,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid.v4(),
      name: 'Teste 2',
      email: 'teste2@teste.com',
      role: UserRole.PATIENT,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid.v4(),
      name: 'Teste 3',
      email: 'teste3@teste.com',
      role: UserRole.PATIENT,
      createdAt: now,
      updatedAt: now,
    },
  ],
  rows: 3,
};

export const userResponse = {
  id: uuid.v4(),
  name: 'Teste 1',
  email: 'teste1@teste.com',
  role: UserRole.PATIENT,
  createdAt: now,
  updatedAt: now,
};
