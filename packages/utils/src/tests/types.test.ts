import { expectError, expectType } from 'tsd';
import { Dictionary, Failure, Result, Success, UpdateType } from '../types';

describe('types', () => {
  it('Dictionary works', () => {
    expectType<Dictionary>({ bar: 'zzzz', foo: 123 });
    expectType<Dictionary<number>>({ bar: 345, foo: 123 });
    // @ts-ignore
    expectError<Dictionary<number>>({ bar: 'zzzz', foo: 123 });
    // @ts-ignore
    expectError<Dictionary>(16);
  });

  it('Failure works', () => {
    expectType<Failure>({ error: new Error('!'), value: null });
    // @ts-ignore
    expectError<Failure>({ bar: 1337 });
  });

  it('Success works', () => {
    expectType<Success<string>>({ error: null, value: 'mosh' });
    expectType<Success<number>>({ error: null, value: 1337 });
    // @ts-ignore
    expectError<Success<string>>({ error: null, value: 56 });
    // @ts-ignore
    expectError<Success<number>>({ value: 1337 });
  });

  it('Result works', () => {
    expectType<Result<string>>({ error: new Error('!'), value: null });
    expectType<Result<string>>({ error: null, value: 'mosh' });
    expectType<Result<number>>({ error: null, value: 1337 });
    // @ts-ignore
    expectError<Result<string>>({ error: null, value: 56 });
    // @ts-ignore
    expectError<Result<number>>({ value: 1337 });
    // @ts-ignore
    expectError<Result>({ bar: 1337 });
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
    // @ts-ignore
    expectError<AB>({ bar: 1337 });
  });
});
