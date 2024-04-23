import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse){
    const { mu, lamb, s ,cw,cs   }  = await req.json()
    console.log({mu, lamb, s, cw, cs})
    const response = await fetch('https://teoria-trafico-colas-2.onrender.com/mms-costos-analysis',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "miu": mu,
            "lamb": lamb,
            "number_servers": s,
            "wait_cost": cw,
            service_cost: cs
        })
    
    })
    const result = await response.json();


    return NextResponse.json({result}, { status: 200 })

}
