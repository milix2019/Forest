import 'babel-polyfill';
import moxios from 'moxios';

describe('fetch_getpopular_data action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Store is updated correctly', () => {
    const expectedState = {
      data: {
        getpopular: [],
        loading_getpopular: false,
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });
  });
});
