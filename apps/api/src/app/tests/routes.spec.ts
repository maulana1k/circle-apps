import { Response } from 'express';
import request from 'supertest';
import app from '../../main';

describe('Test tweet api', () => {
  test('Retrive index home tweets', (done) => {
    request(app)
      .get('/tweet/?limit=10&offset=1')
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        // expect(response)
        done();
      });
  });
});
