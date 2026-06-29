import {
BrainCircuit,
Loader2
}

from "lucide-react";

export default function AIInsight({

plan,

loading

}){

return(

<div

className="
bg-gradient-to-br
from-indigo-700
to-purple-700
rounded-3xl
p-8
text-white
shadow-xl
min-h-[420px]
"

>

<div className="flex items-center gap-3">

<BrainCircuit size={32}/>

<h2 className="text-2xl font-bold">

AI Coach

</h2>

</div>


{

loading ?

(

<div className="mt-12 flex flex-col items-center">

<Loader2

size={40}

className="animate-spin"

/>

<p

className="
mt-5
text-indigo-100
"

>

Generating AI Schedule...

</p>

</div>

)

:

plan ?

(

<div className="mt-8 space-y-2">

{

plan.split("\n").map(

(line,index)=>{

const header =

line.startsWith("🎯")

||

line.startsWith("📅")

||

line.startsWith("🚀")

||

line.startsWith("💡")

||

line.startsWith("⚠");


return(

<p

key={index}

className={

header

?

"text-white font-bold text-lg mt-5"

:

"text-indigo-100 leading-7"

}

>

{line}

</p>

)

}

)

}

</div>

)

:

(

<div className="mt-10">

<p

className="
text-indigo-100
leading-7
"

>

Press

<b>

 Generate AI Plan

</b>

to receive an intelligent study schedule.

</p>

</div>

)

}

</div>

)

}