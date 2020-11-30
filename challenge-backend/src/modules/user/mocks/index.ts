import * as moment from 'moment';
import * as uuid from 'uuid';

import { UserRole } from '../user.entity';

export const usersResponse = {
  data: [
    {
      id: uuid.v4(),
      name: 'Teste 1',
      email: 'teste1@teste.com',
      role: UserRole.PATIENT,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    },
    {
      id: uuid.v4(),
      name: 'Teste 2',
      email: 'teste2@teste.com',
      role: UserRole.PATIENT,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    },
    {
      id: uuid.v4(),
      name: 'Teste 3',
      email: 'teste3@teste.com',
      role: UserRole.PATIENT,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    },
  ],
  rows: 3,
};

export const userResponse = {
  id: uuid.v4(),
  name: 'Teste 1',
  email: 'teste1@teste.com',
  role: UserRole.PATIENT,
  createdAt: moment().unix(),
  updatedAt: moment().unix(),
};
