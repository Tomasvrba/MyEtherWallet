import Aave from '@/dapps/Aave/Aave.vue';
import { shallowMount } from '@vue/test-utils';
import { Tooling } from '@@/helpers';
import VueX from 'vuex';
import { state, getters } from '@@/helpers/mockStore';

describe('Aave.vue', () => {
  let localVue, wrapper, i18n, store;

  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = new VueX.Store({
      modules: {
        main: {
          namespaced: true,
          state,
          getters
        }
      }
    });
  });

  beforeEach(() => {
    const mockRoute = {
      fullPath: '/interface/dapps/aave/action',
      params: {
        token: {}
      }
    };

    wrapper = shallowMount(Aave, {
      localVue,
      i18n,
      store,
      attachToDocument: true,
      propsData: {
        tokensWithBalance: []
      },
      mocks: {
        $route: mockRoute
      },
      stubs: [
        'popover',
        'router-view',
        { apolloClient: { getLiquidityRateHistoryUpdate: jest.fn() } }
      ]
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should render the correct data', () => {
    expect(wrapper.vm.$data.activeDepositTab).toEqual(true);
    expect(wrapper.vm.$data.activeBorrowTab).toEqual(false);
    expect(wrapper.vm.$data.loadingHome).toEqual(true);
    expect(wrapper.vm.$data.loadingReserves).toEqual(true);
    expect(wrapper.vm.$data.reservesData).toEqual([]);
    expect(wrapper.vm.$data.rawReserveData).toEqual([]);
    expect(wrapper.vm.$data.reservesStable).toEqual([]);
    expect(wrapper.vm.$data.actionType).toEqual('');
    expect(wrapper.vm.$data.userReserveData).toEqual([]);
    expect(wrapper.vm.$data.token).toEqual({});
    expect(wrapper.vm.$data.usdPriceEth).toEqual('');
    expect(wrapper.vm.$data.userSummary).toEqual({});
    expect(wrapper.vm.$data.rateHistory).toEqual({
      labels: [],
      stableRates: [],
      variableRates: []
    });
    expect(wrapper.vm.$data.pendingToken).toEqual({});
  });

  it('should display the correct action title', () => {
    expect(wrapper.vm.actionTitle).toEqual('Deposit');
  });

  it('watches routes param token', async () => {
    wrapper.setData({ $route: { params: { token: { symbol: 'ETH' } } } });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.token).toBe({ symbol: 'ETH' });
  });

  it('watches tokensWithBalance', async () => {
    const getReserveBalances = jest.fn();
    const tokensWithBalance = [{ name: 'ETH' }];
    wrapper.setData(tokensWithBalance);
    await wrapper.vm.$nextTick();
    expect(getReserveBalances).toHaveBeenCalled();
  });
});
