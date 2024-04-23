// pages/api/mmsk.ts
import { NextRequest, NextResponse } from "next/server";
import {MMSK} from '../../utils/mmsk';

export async  function POST(req: NextRequest, res: NextResponse) {
        const { mu, lamb, s, k, n }  = await req.json()

        if (!mu || !lamb || !s || !k || !n || isNaN(Number(mu)) || isNaN(Number(lamb)) || isNaN(Number(s)) || isNaN(Number(k)) || isNaN(Number(n))) {
            // res.status(400).json({ error: 'Please provide valid numeric values for mu, lamb, s, k, and n.' });
            return NextResponse.json({ error: 'Please provide valid numeric values for mu, lamb, s, k, and n.' }, { status: 400 });
            return;

        }

        const mmsk = new MMSK(Number(mu), Number(lamb), Number(s), Number(k));
        const pn = mmsk.getPn(Number(n));
        const result = {
            rho: mmsk.getRho(),
            pn: pn,
            lq: mmsk.getLq(),
            l: mmsk.getL(),
            wq: mmsk.getWq(),
            w: mmsk.getW()
        };

        // res.status(200).json(results);
        return NextResponse.json({ result }, { status: 200 })
   
}
