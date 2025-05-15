export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly error: string | null;
  private readonly _value?: T;

  private constructor(isSuccess: boolean, error?: string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result must contain an error message');
    }

    this.isSuccess = isSuccess;
    this.error = error ?? null;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get the value of a failed result.');
    }
    return this._value as T;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static failure<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
