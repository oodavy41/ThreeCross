export abstract class timeSeriesFliter {
  smoothing: number;
  realBuffer: number[];
  calcBuffer: number[];
  bufferMaxSize: number;

  constructor(smoothing?: number, size: number = 10) {
    this.smoothing = smoothing || 0.5;
    this.realBuffer = [];
    this.calcBuffer = [];
    this.bufferMaxSize = size;
  }
  protected _push(nextValue: number) {
    if (this.realBuffer.length >= this.bufferMaxSize) {
      this.realBuffer.pop();
    }
    this.realBuffer.unshift(nextValue);
  }

  protected abstract _calc(): number;

  next(nextValue: number) {
    this._push(nextValue);
    return this._calc();
  }
}

export class EMWA extends timeSeriesFliter {
  protected _calc() {
    let result;
    if (this.calcBuffer.length === 0) {
      result = this.realBuffer[0];
    } else {
      result =
        this.smoothing * this.realBuffer[0] +
        (1 - this.smoothing) * this.calcBuffer[0];
    }
    if (this.calcBuffer.length >= this.bufferMaxSize) {
      this.calcBuffer.pop();
    }
    this.calcBuffer.unshift(result);
    return result;
  }
}

export class ArraySeries<T extends timeSeriesFliter> {
  size: number;
  filters: T[];

  constructor(cstr: new (...args: any[]) => T, size: number, smooth: number) {
    this.size = size;
    this.filters = new Array(size).fill(0).map((_) => new cstr(smooth));
  }

  next(vectors: number[]) {
    let result = vectors.map((vector, index) => {
      return this.filters[index]!.next(vector)!;
    });

    return result;
  }
}
