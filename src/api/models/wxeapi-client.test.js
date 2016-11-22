/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import { expect } from 'chai';
import { getToken } from './wxeapi-client';

describe('wxent-api-redis', () => {
  it('should get null', async () => {
    const token = await getToken();
    expect(token).to.be.null;
  });
});
