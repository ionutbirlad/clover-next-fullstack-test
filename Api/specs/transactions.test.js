const supertest = require('supertest');

const app = require('../app');
const db = require('../db/connect-test');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const { genereteAuthToken } = require('../helpers/auth');

const agent = supertest.agent(app);

jest.mock('../helpers/secrets.js');

// Mocks Transactions
const transactionMock1 = {
  title: 'Transaction1',
  amount: 120,
  type: 'expense',
  category: 'bills',
  date: '2026-01-12'
};
const transactionMock2 = {
  title: 'Transaction2',
  amount: 350,
  type: 'income',
  category: 'freelance',
  date: '2026-04-28'
};
const transactionMock3 = {
  title: 'Transaction3',
  amount: 280,
  type: 'expense',
  category: 'shopping',
  date: '2026-09-03'
};

let user1;
let user2;
let token1;
let token2;

let transaction1;
let transaction2;

// Helpers
const createTransactionFixtures = async () => {
  transaction1 = await new Transaction({
    ...transactionMock1,
    user: user1.id
  }).save();

  transaction2 = await new Transaction({
    ...transactionMock2,
    user: user2.id
  }).save();

  await new Transaction({
    ...transactionMock3,
    user: user1.id
  }).save();
};

beforeAll(async () => await db.connect());
beforeEach(async () => {
  await db.clear();

  // Users creation
  const User1Creation = async () => {
    user1 = await new User({
      name: 'User1',
      lastname: 'Normal',
      email: 'testuser1@theserialcoder.com',
      password: '1234abcd',
      roles: ['user'],
      active: true
    }).save();

    token1 = genereteAuthToken(user1).token;
  };
  const User2Creation = async () => {
    user2 = await new User({
      name: 'User2',
      lastname: 'Normal',
      email: 'testuser2@theserialcoder.com',
      password: '1234abcd',
      roles: ['user'],
      active: true
    }).save();

    token2 = genereteAuthToken(user2).token;
  };

  return Promise.all([User1Creation(), User2Creation()]);
});
afterEach(async () => await jest.clearAllMocks());
afterAll(async () => await db.close());

describe('Transaction categories', () => {
  describe('GET /transactions/categories', () => {
    test('Non authenticated user', async () => {
      const res = await agent.get('/transactions/categories').expect(401);

      expect(res.body).toStrictEqual({
        error: 401,
        message: 'Unauthorized',
        data: {}
      });
    });

    test('Authenticated user', async () => {
      const res = await agent.get('/transactions/categories').set('Cookie', `accessToken=${token1}`).expect(200);

      expect(res.body).toStrictEqual([
        {
          value: 'salary',
          label: 'Salary',
          type: 'income'
        },
        {
          value: 'freelance',
          label: 'Freelance',
          type: 'income'
        },
        {
          value: 'food',
          label: 'Food',
          type: 'expense'
        },
        {
          value: 'bills',
          label: 'Bills',
          type: 'expense'
        },
        {
          value: 'shopping',
          label: 'Shopping',
          type: 'expense'
        }
      ]);
    });
  });
});

describe('Transactions', () => {
  // Creation
  describe('POST /transactions', () => {
    test('Create a transaction', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token1}`)
        .send(transactionMock1)
        .expect(200);

      expect(res.body).toMatchObject({
        title: transactionMock1.title,
        amount: transactionMock1.amount,
        type: transactionMock1.type,
        category: transactionMock1.category,
        date: new Date(transactionMock1.date).toISOString()
      });
      expect(res.body._id).toMatch(/^[a-f0-9]{24}$/);
      expect(res.body.createdAt).toEqual(expect.any(String));
      expect(res.body.updatedAt).toEqual(expect.any(String));
    });

    test('Automatically assign the authenticated user', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token2}`)
        .send(transactionMock2)
        .expect(200);

      const savedTransaction = await Transaction.findById(res.body._id);

      expect(savedTransaction.user.toString()).toBe(user2.id);
    });

    test('Non authenticated user cannot create transactions', async () => {
      await agent.post('/transactions').send(transactionMock2).expect(401);
    });

    test.each(['title', 'amount', 'type', 'category', 'date'])('Missing required field: %s', async field => {
      const payload = { ...transactionMock1 };
      delete payload[field];

      const res = await agent.post('/transactions').set('Cookie', `accessToken=${token1}`).send(payload).expect(400);

      expect(res.body).toStrictEqual({
        error: 201,
        message: 'Missing required parameters',
        data: `/${field}`
      });
    });

    test('Invalid date type', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token1}`)
        .send({
          ...transactionMock1,
          date: null
        })
        .expect(400);

      expect(res.body).toMatchObject({
        message: 'Validation error',
        data: '/date'
      });
    });

    test('Additional field added to body', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token2}`)
        .send({
          ...transactionMock3,
          unexpectedField: 'unexpectedValue'
        })
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 202,
        message: 'Additional parameters are not permitted',
        data: '/unexpectedField'
      });
    });

    test('Create transaction with amount < 0', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token1}`)
        .send({
          ...transactionMock1,
          amount: -150
        })
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/amount'
      });
    });

    test('Create transaction with unexpected type', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token2}`)
        .send({
          ...transactionMock2,
          type: 'unexpectedType'
        })
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/type'
      });
    });

    test('Create transaction with unexpected category', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token2}`)
        .send({
          ...transactionMock3,
          category: 'unexpectedCategory'
        })
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/category'
      });
    });

    test('Create transaction with empty title', async () => {
      const res = await agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token1}`)
        .send({
          ...transactionMock1,
          title: ''
        })
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/title'
      });
    });
  });

  // List
  describe('GET /transactions', () => {
    beforeEach(createTransactionFixtures);

    test('Return only transactions that belong to the logged user', async () => {
      const res = await agent.get('/transactions').set('Cookie', `accessToken=${token2}`).expect(200);

      expect(res.body).toHaveLength(1);
      expect(res.body[0]._id).toBe(transaction2.id);

      expect(res.body[0]).toMatchObject({
        title: transactionMock2.title,
        amount: transactionMock2.amount,
        type: transactionMock2.type,
        category: transactionMock2.category,
        date: new Date(transactionMock2.date).toISOString()
      });
    });

    test('Not allowed to fetch transaction if not authenticated', async () => {
      const res = await agent.get('/transactions').expect(401);

      expect(res.body).toStrictEqual({
        error: 401,
        message: 'Unauthorized',
        data: {}
      });
    });

    test('Return only transactions filtered per title', async () => {
      const res = await agent
        .get('/transactions?title=Transaction1')
        .set('Cookie', `accessToken=${token1}`)
        .expect(200);

      expect(res.body).toHaveLength(1);
      expect(res.body[0]._id).toBe(transaction1.id);

      expect(res.body[0]).toMatchObject({
        title: transactionMock1.title,
        amount: transactionMock1.amount,
        type: transactionMock1.type,
        category: transactionMock1.category,
        date: new Date(transactionMock1.date).toISOString()
      });
    });

    test('Returns an empty array when all user transactions are soft-deleted', async () => {
      await transaction2.softDelete();

      const res = await agent.get('/transactions').set('Cookie', `accessToken=${token2}`).expect(200);

      expect(res.body).toHaveLength(0);
    });
  });

  // Detail
  describe('GET /transactions/:id', () => {
    beforeEach(createTransactionFixtures);

    test('Returns the requested transaction', async () => {
      const res = await agent
        .get(`/transactions/${transaction1.id}`)
        .set('Cookie', `accessToken=${token1}`)
        .expect(200);

      expect(res.body._id).toBe(transaction1.id);

      expect(res.body).toMatchObject({
        ...transactionMock1,
        date: new Date(transactionMock1.date).toISOString()
      });
    });

    test('Not allowed to request transaction that belongs to another user', async () => {
      const res = await agent
        .get(`/transactions/${transaction1.id}`)
        .set('Cookie', `accessToken=${token2}`)
        .expect(404);

      expect(res.body).toStrictEqual({
        error: 404,
        message: 'Not found',
        data: {}
      });
    });

    test('Returns "not found" if transaction does not exist', async () => {
      const res = await agent
        .get('/transactions/6a37ae9cbe38687987804e22')
        .set('Cookie', `accessToken=${token1}`)
        .expect(404);

      expect(res.body).toStrictEqual({
        error: 404,
        message: 'Not found',
        data: {}
      });
    });

    test('Returns validation error if ID has not the predicted shape', async () => {
      const res = await agent.get('/transactions/wrongIdShape').set('Cookie', `accessToken=${token1}`).expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/id'
      });
    });

    test('Returns "not found" if transaction was soft deleted', async () => {
      await transaction1.softDelete();

      const res = await agent
        .get(`/transactions/${transaction1.id}`)
        .set('Cookie', `accessToken=${token1}`)
        .expect(404);

      expect(res.body).toStrictEqual({
        error: 404,
        message: 'Not found',
        data: {}
      });
    });

    test('Returns "not allowed" if user is not authenticated', async () => {
      const res = await agent.get(`/transactions/${transaction1.id}`).expect(401);

      expect(res.body).toStrictEqual({
        error: 401,
        message: 'Unauthorized',
        data: {}
      });
    });
  });

  // Update
  describe('PATCH /transactions/:id', () => {
    beforeEach(createTransactionFixtures);

    test('Updates a transaction and returns the predicted data', async () => {
      const payload = {
        title: 'Transaction1-updated',
        amount: 1500
      };

      const res = await agent
        .patch(`/transactions/${transaction1.id}`)
        .send(payload)
        .set('Cookie', `accessToken=${token1}`)
        .expect(200);

      expect(res.body._id).toBe(transaction1.id);
      expect(res.body).toMatchObject({
        ...transactionMock1,
        ...payload,
        date: new Date(transactionMock1.date).toISOString()
      });
    });

    test('Returns "not found" if transaction belongs to anonther user', async () => {
      const payload = {
        title: 'Transaction1-updated',
        amount: 1500
      };

      const res = await agent
        .patch(`/transactions/${transaction1.id}`)
        .send(payload)
        .set('Cookie', `accessToken=${token2}`)
        .expect(404);

      expect(res.body).toStrictEqual({
        error: 404,
        message: 'Not found',
        data: {}
      });
    });

    test('Returns "not found" if transaction does not exist', async () => {
      const payload = {
        title: 'Transaction1-updated',
        amount: 1500
      };

      const res = await agent
        .patch('/transactions/6a32ce63b96a46464c039053')
        .send(payload)
        .set('Cookie', `accessToken=${token2}`)
        .expect(404);

      expect(res.body).toStrictEqual({
        error: 404,
        message: 'Not found',
        data: {}
      });
    });

    test('Returns validation error if ID has the wrong shape', async () => {
      const payload = {
        title: 'Transaction1-updated',
        amount: 1500
      };

      const res = await agent
        .patch('/transactions/wrongIdShape')
        .send(payload)
        .set('Cookie', `accessToken=${token2}`)
        .expect(400);

      expect(res.body).toStrictEqual({
        error: 200,
        message: 'Validation error',
        data: '/id'
      });
    });

    test('Non authenticated users cannot update transactions', async () => {
      const payload = {
        title: 'Transaction1-updated',
        amount: 1500
      };

      const res = await agent.patch(`/transactions/${transaction1.id}`).send(payload).expect(401);

      expect(res.body).toStrictEqual({
        error: 401,
        message: 'Unauthorized',
        data: {}
      });
    });
  });

  // describe('DELETE /transactions/:id', () => {
  //   // soft delete, ownership
  // });
});
