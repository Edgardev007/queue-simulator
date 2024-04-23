// utils/mmsk.ts
export class MMSK {
    private mu: number;
    private lamb: number;
    private s: number;
    private k: number;
    private _rho: number;
    private __rho: number;
    private __lamb_eff: number;

    constructor(mu: number, lamb: number, s: number, k: number) {
        this.mu = mu;
        this.lamb = lamb;
        this.s = s;
        this.k = k;
        this._rho = lamb / (s * mu);
        this.__rho = lamb / mu;
        this.__lamb_eff = this.lamb * Array.from({length: k + 1}, (_, n) => (k - n) * this.getPn(n)).reduce((a, b) => a + b, 0);
    }

    private factorial(n: number): number {
        return n <= 1 ? 1 : n * this.factorial(n - 1);
    }

    private pow(base: number, exp: number): number {
        return Math.pow(base, exp);
    }

    @roundToDecimals()
    getRho(): number {
        return this.lamb / (this.mu * this.k);
    }

    @roundToDecimals()
    getPn(n: number): number {
        if (n > this.k) {
            return 0;
        }
        if (n === 0) {
            return 1 / (Array.from({length: this.s + 1}, (_, i) => this.pow(this.__rho, i) / this.factorial(i)).reduce((acc, val) => acc + val,0) +
                (this.pow(this.__rho, this.s) / this.factorial(this.s)) * Array.from({length: this.k - this.s}, (_, i) => this.pow(this.__rho / (this.s * this.mu), i)).reduce((acc, val) => acc + val,0));
        }
        if (n < this.s) {
            return (this.pow(this.__rho, n) / this.factorial(n)) * this.getPn(0);
        }
        return (this.pow(this.__rho, n) / (this.factorial(this.s) * this.pow(this.s, n - this.s))) * this.getPn(0);
    }

    @roundToDecimals()
    getLq(): number {
        return Array.from({length: this.k - this.s}, (_, i) => (i + 1 + this.s) * this.getPn(i + 1 + this.s)).reduce((acc, val) => acc + val, 0);
    }

    @roundToDecimals()
    getL(): number {
        return this.getLq() + (this.__lamb_eff / this.mu);
    }

    @roundToDecimals()
    getWq(): number {
        return this.getLq() / this.__lamb_eff;
    }

    @roundToDecimals()
    getW(): number {
        return this.getWq() + (1 / this.mu);
    }
}

function roundToDecimals(decimals: number = 2): MethodDecorator {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            return parseFloat(result.toFixed(decimals));
        };
        return descriptor;
    }
}


