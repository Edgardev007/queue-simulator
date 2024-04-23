// pages/api/mm1.js
import {MM1} from '../../utils/mm1';
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    console.log(searchParams.get("igenykod"));
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 })
  }

export async function POST(req:NextRequest, res: NextResponse) {
    const { mu, lamb:lambda, n }  = await req.json()
    console.log({mu , lambda,n})
    if (!mu || !lambda) {
    return NextResponse.json({ error: 'Missing required parameters mu and lamb' }, { status: 400 });
    }

    // const mm1 = new MM1(parseFloat(mu), parseFloat(lambda));

    // if (n !== undefined) {
    //     try {
    //         const pn = mm1.getPn(parseInt(n));
    //         // return res.status(200).json({ pn });
    //         return NextResponse.json({ pn }, { status: 200 })
    //     } catch (error) {
    //         // return res.status(400).json({ error: error.message });
    //         return NextResponse.json({ error: error.message }, { status: 200 })
    //     }
    // }

    // // Return general statistics if no specific 'n' is requested
    // const rho = mm1.getRho();
    // const l = mm1.getL();
    // const lq = mm1.getLq();
    // const w = mm1.getW();
    // const wq = mm1.getWq();
    // const resulta ={ rho, l, lq, w, wq }
    console.log({mu,lambda})
    const response = await fetch('https://queue-simulator-mauve.vercel.app/api/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mu:Number(mu), lambda:Number(lambda), servers: 1,  capacity: 0 })
    });
    const result = await response.json();
    console.log(result)
    if(result.message){
        return NextResponse.json({ result:{messge: 'Probability n that there are n customers in the system at time t'} }, { status: 200 });

    }
    
    
    return NextResponse.json({result}, { status: 200 })

}
