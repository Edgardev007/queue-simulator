// pages/api/mms.ts
import { NextRequest, NextResponse } from "next/server";
import { MMS } from '../../utils/mms';

export async function POST (req: NextRequest, res: NextResponse) {
console.log('a')
    const { mu, lamb:lambda, s,n }  = await req.json()
    console.log({mu, lambda, s, n})

    if (!mu || !lambda || !s ) {
    //   res.status(400).json({ error: 'Missing parameters. Please provide mu, lamb, s, and n.' });
      return NextResponse.json({ error: 'Missing parameters. Please provide mu, lamb, s, and n.' }, { status: 400 });
      
    }

    const mms = new MMS(Number(mu), Number(lambda), Number(s));
    const pn = mms.get_pn(Number(n));
    const results = {
      rho: mms.get_rho(),
      pn,
      lq: mms.get_lq(),
      l: mms.get_l(),
      wq: mms.get_wq(),
      w: mms.get_w()
    };

    // res.status(200).json(results);
    const response = await fetch('https://queue-simulator-mauve.vercel.app/api/calculate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mu:Number(mu), lambda:Number(lambda), servers: Number(s),  capacity: 0 })
  });
  const result = await response.json();
  if(result.message){
    return NextResponse.json({ result:{messge: 'Probability n that there are n customers in the system at time t'} }, { status: 200 });

}
    return NextResponse.json({result}, { status: 200 })
  
}
