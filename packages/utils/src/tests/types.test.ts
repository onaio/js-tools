import { expectType } from 'tsd';
import { Dictionary, Failure, Result, Success, UpdateType } from '../types';

describe('types', () => {
  it('Dictionary works', () => {
    expectType<Dictionary>({ bar: 'zzzz', foo: 123 });
    expectType<Dictionary<number>>({ bar: 345, foo: 123 });
  });

  it('Failure works', () => {
    expectType<Failure>({ error: new Error('!'), value: null });
  });

  it('Success works', () => {
    expectType<Success<string>>({ error: null, value: 'mosh' });
    expectType<Success<number>>({ error: null, value: 1337 });
  });

  it('Result works', () => {
    expectType<Result<string>>({ error: new Error('!'), value: null });
    expectType<Result<string>>({ error: null, value: 'mosh' });
    expectType<Result<number>>({ error: null, value: 1337 });
  });

  it('UpdateType works', () => {
    interface A {
      foo: string;
    }

    interface B {
      bar: number;
    }

    type AB = UpdateType<A, B>;

    expectType<AB>({ bar: 1337, foo: 'leet' });
  });
});
