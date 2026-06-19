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

  // Transaction creation
  const Transaction1Creation = async () => {
    transaction1 = await new Transaction({
      ...transactionMock1,
      user: user1.id
    }).save();
  };
  const Transaction2Creation = async () => {
    transaction2 = await new Transaction({
      ...transactionMock2,
      user: user2.id
    }).save();
  };
  const Transaction3Creation = async () => {
    await new Transaction({
      ...transactionMock3,
      user: user1.id
    }).save();
  };

  await Promise.all([User1Creation(), User2Creation()]);
  return Promise.all([Transaction1Creation(), Transaction2Creation(), Transaction3Creation()]);
});
afterEach(async () => await jest.clearAllMocks());
afterAll(async () => await db.close());

describe('Transaction categories', () => {
  describe('GET /transactions/categories', () => {
    test('Non authenticated user', () =>
      agent
        .get('/transactions/categories')
        .expect(401)
        .then(res =>
          expect(res.body).toStrictEqual({
            error: 401,
            message: 'Unauthorized',
            data: {}
          })
        ));

    test('Authenticated user', () =>
      agent
        .get('/transactions/categories')
        .set('Cookie', `accessToken=${token1}`)
        .expect(200)
        .then(res =>
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
          ])
        ));
  });
});

describe('Transactions', () => {
  // Creation
  describe('POST /transactions', () => {
    test('Create a transaction', () =>
      agent
        .post('/transactions')
        .set('Cookie', `accessToken=${token1}`)
        .send(transactionMock1)
        .expect(200)
        .then(res => {
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
        }));

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
  });

  // describe('GET /transactions', () => {
  //   // lista, filtri, ownership
  // });

  // describe('GET /transactions/:id', () => {
  //   // dettaglio, ownership, not found
  // });

  // describe('PATCH /transactions/:id', () => {
  //   // aggiornamento, ownership, validazione
  // });

  // describe('DELETE /transactions/:id', () => {
  //   // soft delete, ownership
  // });
});
