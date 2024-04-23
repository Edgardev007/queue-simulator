function roundToDecimals(value: number, decimals: number = 2): number {
    return parseFloat(value.toFixed(decimals));
}

export class MM1K {
    private mu: number;
    private lamb: number;
    private k: number;
    private _rho: number;
    private lambEff: number;

    constructor(mu: number, lamb: number, k: number) {
        this.mu = mu;
        this.lamb = lamb;
        this.k = k;
        this._rho = lamb / mu;
        this.lambEff = lamb * (1 - this.getPn(k));
    }

    getRho(): number {
        return roundToDecimals(this._rho);
    }

    getPn(n: number): number {
        if (n < 0) {
            throw new Error("n must be greater than or equal to 0");
        }

        if (this._rho === 1) {
            return roundToDecimals(1 / (this.k + 1));
        }

        const result = (1 - this._rho) / (1 - Math.pow(this._rho, this.k + 1)) * Math.pow(this._rho, n);
        return roundToDecimals(result);
    }

    getL(): number {
        if (this._rho === 1) {
            return roundToDecimals(this.k / 2);
        }

        const result = (this._rho / (1 - this._rho)) - (((this.k + 1) * Math.pow(this._rho, this.k + 1)) / (1 - Math.pow(this._rho, this.k + 1)));
        return roundToDecimals(result);
    }

    getLq(): number {
        return roundToDecimals(this.getL() - (1 - this.getPn(0)));
    }

    getW(): number {
        return roundToDecimals(this.getL() / this.lambEff);
    }

    getWq(): number {
        return roundToDecimals(this.getLq() / this.lambEff);
    }

    result(): void {
        console.log(`
            System: M/M/1/${this.k}
            Customer arrival rate Lambda: ${this.lamb}
            Customer service rate Mu: ${this.mu}
            Number of servers: ${this.k}
            Utilization factor: ${this.getRho()}
            Expected number of customers in the system: ${this.getL()}
            Expected number of customers in the queue: ${this.getLq()}
            Expected time a customer spends in the system: ${this.getW()}
            Expected time a customer spends in the queue: ${this.getWq()}
        `);
    }
}
