export class MMS {
    private mu: number;
    private lamb: number;
    private s: number;
    private _rho: number;
    private __rho: number;

    constructor(mu: number, lamb: number, s: number) {
        this.mu = mu;
        this.lamb = lamb;
        this.s = s;
        this._rho = lamb / (s * mu);
        this.__rho = lamb / mu;
    }

    private factorial(n: number): number {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    private pow(base: number, exponent: number): number {
        return Math.pow(base, exponent);
    }

    @roundToDecimals()
    get_rho(): number {
        return this._rho;
    }

    @roundToDecimals()
    get_pn(n: number): number {
        if (n === 0) {
            return 1 / (Array.from({ length: this.s }, (_, i) => this.pow(this.__rho, i) / this.factorial(i)).reduce((acc, val) => acc + val) +
                (this.pow(this.__rho, this.s) / this.factorial(this.s)) * ((this.s * this.mu) / (this.s * this.mu - this.lamb)));
        }

        if (n <= this.s) {
            return (this.pow(this.__rho, n) / this.factorial(n)) * this.get_pn(0);
        }

        return (this.pow(this.__rho, n) / (this.factorial(this.s) * this.pow(this.s, n - this.s))) * this.get_pn(0);
    }

    @roundToDecimals()
    get_lq(): number {
        return (this.pow(this.__rho, this.s) / this.factorial(this.s)) * (this._rho / Math.pow(1 - this._rho, 2)) * this.get_pn(0);
    }

    @roundToDecimals()
    get_l(): number {
        return this.get_lq() + this.__rho;
    }

    @roundToDecimals()
    get_wq(): number {
        return this.get_lq() / this.lamb;
    }

    @roundToDecimals()
    get_w(): number {
        return this.get_wq() + (1 / this.mu);
    }
}

// Decorator function to round values to a specified number of decimal places
function roundToDecimals(decimals: number = 2): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args);
            return parseFloat(result.toFixed(decimals));
        }
        return descriptor;
    }
}
