// pages/api/mm1.js
import {MM1K} from '../../utils/mm1k';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    const { mu, lamb:lambda, k }  = await req.json()

        if (!mu || !lambda || !k) {
            return NextResponse.json({ error: 'Missing parameters mu, lamb, or k' }, { status: 400 });
            return;
        }

        const response = await fetch('https://queue-simulator-mauve.vercel.app/api/calculate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mu:Number(mu), lambda:Number(lambda), servers: 1,  capacity: Number(k) })
  });
  const result = await response.json();
  if(result.message){
    return NextResponse.json({ result:{messge: 'Probability n that there are n customers in the system at time t'} }, { status: 200 });

}
    return NextResponse.json({result}, { status: 200 })

}
