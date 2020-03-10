import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { FlushThunks } from 'redux-testkit';
import thunk from 'redux-thunk';
import { SingleObject } from '../SingleObject';
import reducer, {
  Message,
  removeMessagesAction,
  selectOneMessage,
  SEND_MESSAGE,
  sendMessage,
  SendMessageAction
} from './ducks/messages';

interface TestProps {
  actionCreator?: typeof sendMessage;
  callbackFunc?: () => void;
  messages?: Message[];
}

const TestComponent = (_: TestProps) => <div>mosh</div>;

/** SingleObject options */
const objectListOptions = {
  actionCreator: sendMessage,
  dispatchPropName: 'actionCreator',
  returnPropName: 'message',
  selector: selectOneMessage
};

const ClassBasedView = new SingleObject<
  Message,
  SendMessageAction,
  typeof selectOneMessage,
  TestProps
>(TestComponent, objectListOptions);

describe('cbv/SingleObject', () => {
  let flushThunks;
  let store: Store;

  beforeEach(() => {
    jest.resetAllMocks();
    flushThunks = FlushThunks.createMiddleware();
    store = createStore(
      combineReducers({ messages: reducer }),
      applyMiddleware(flushThunks, thunk)
    );
    store.dispatch(removeMessagesAction());
  });
  it('getMapStateToProps works as expected', () => {
    const mapStateToProps = ClassBasedView.getMapStateToProps();

    expect(typeof mapStateToProps === 'function').toBeTruthy();

    expect(mapStateToProps(store.getState(), {} as any)).toEqual({ message: null });

    store.dispatch(sendMessage({ user: 'bob', message: 'hello' }));
    store.dispatch(sendMessage({ user: 'bobbie', message: 'hello hello' }));

    expect(mapStateToProps(store.getState(), {} as any)).toEqual({
      message: { user: 'bob', message: 'hello' }
    });
  });

  it('getMapDispatchToProps works as expected', () => {
    const mapDispatchToProps = ClassBasedView.getMapDispatchToProps();
    expect(typeof mapDispatchToProps === 'function').toBeFalsy();
    expect(mapDispatchToProps).toEqual({ actionCreator: sendMessage });
  });

  it('getHOC works as expected', () => {
    const HoC = ClassBasedView.getHOC();

    const wrapper = mount(
      <Provider store={store}>
        <HoC />
      </Provider>
    );

    const expected = {
      actionCreator: sendMessage
    };

    expect(wrapper.find('HoC').props()).toEqual(expected);
    expect(wrapper.find('HoC>TestComponent').props()).toEqual(expected);
  });

  it('render and getConnectedHOC works as expected', () => {
    const ConnectedHOCComponent = ClassBasedView.getConnectedHOC();
    const ConnectedTestComponent = ClassBasedView.render();

    const toTest = [ConnectedHOCComponent, ConnectedTestComponent];

    for (const Element of toTest) {
      store.dispatch(removeMessagesAction());
      store.dispatch(sendMessage({ user: 'bob', message: 'hello' }));
      store.dispatch(sendMessage({ user: 'bobbie', message: 'hello hello' }));

      const wrapper = mount(
        <Provider store={store}>
          <Element />
        </Provider>
      );

      const expected = {
        actionCreator: sendMessage,
        message: { user: 'bob', message: 'hello' }
      };

      expect(wrapper.find('Connect(HoC)').props()).toEqual({});
      expect(wrapper.find('Connect(HoC)>HoC').props()).toEqual({
        ...expected,
        actionCreator: expect.any(Function)
      });
      expect(wrapper.find('Connect(HoC)>HoC>TestComponent').props()).toEqual({
        ...expected,
        actionCreator: expect.any(Function)
      });

      const finalProps = wrapper.find('Connect(HoC)>HoC>TestComponent').props();

      const payload = { user: 'bob', message: 'hello' };

      expect((finalProps as any).actionCreator(payload)).toEqual({
        payload,
        type: SEND_MESSAGE
      });
    }
  });
});
