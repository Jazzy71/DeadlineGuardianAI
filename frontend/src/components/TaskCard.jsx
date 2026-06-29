import { motion } from "framer-motion";

import {

useState,

useEffect

}

from "react";

export default function TaskCard({

id,

title,

priority,

deadline,

progress,

onProgressChange

}){

const [

localProgress,

setLocalProgress

]

=

useState(

progress

);


useEffect(()=>{

setLocalProgress(

progress

);

},

[progress]

);


return(

<motion.div

whileHover={{

scale:1.02

}}

className="
bg-slate-900
border
border-slate-700
rounded-3xl
p-6
"

>

<div className="flex justify-between items-center">

<div>

<h3

className="text-white text-xl font-bold"

>

{title}

</h3>

<p

className="text-slate-400 mt-1"

>

Priority :

<span

className="ml-2 text-indigo-400"

>

{priority}

</span>

</p>

<p

className="text-slate-400"

>

Deadline :

{deadline}

</p>

</div>

<div>

<h2

className={`

text-3xl

font-bold

${

localProgress===100

?

"text-green-400"

:

"text-cyan-400"

}

`}

>

{localProgress}%

</h2>

</div>

</div>



<div className="mt-5">

<div

className="bg-slate-800 rounded-full h-3"

>

<div

style={{

width:

`${localProgress}%`

}}

className={`

h-3

rounded-full

transition-all

duration-500

${

localProgress===100

?

"bg-green-500"

:

"bg-gradient-to-r from-indigo-500 to-cyan-400"

}

`}

/>

</div>

</div>



<div className="mt-5">

<input

type="range"

min="0"

max="100"

value={localProgress}

onChange={(e)=>{

setLocalProgress(

parseInt(

e.target.value

)

)

}}

onMouseUp={()=>{

onProgressChange(

id,

localProgress

)

}}

className="
w-full
cursor-pointer
accent-indigo-500
"

/>

</div>

</motion.div>

)

}