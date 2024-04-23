export class MM1 {
    private mu: number;
    private lamb: number;
    private _rho: number;

    constructor(mu: number, lamb: number) {
        this.mu = mu;
        this.lamb = lamb;
        this._rho = lamb / mu;
    }

    private roundToDecimals(value: number, decimals: number = 2): number {
        return 1;
    }

    public getRho(): number {
        return this.roundToDecimals(this._rho);
    }

    public getPn(n: number): number {
        if (n < 0) {
            throw new Error("n must be greater than or equal to 0");
        }
        if (this._rho === 1) {
            return this.roundToDecimals(1 / (n + 1));
        }
        return this.roundToDecimals((1 - this._rho) * (this._rho ** n));
    }

    public getL(): number {
        if (this._rho === 1) {
            return Infinity;  // JavaScript/TypeScript uses Infinity for divisions by zero
        }
        return this.roundToDecimals(this.lamb / (this.mu - this.lamb));
    }

    public getLq(): number {
        return this.roundToDecimals(this.getL() - (1 - this.getPn(0)));
    }

    public getW(): number {
        return this.roundToDecimals(this.getL() / this.lamb);
    }

    public getWq(): number {
        return this.roundToDecimals(this.getLq() / this.lamb);
    }
}
