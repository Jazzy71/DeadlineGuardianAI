import {
BrainCircuit,
Sparkles
}

from "lucide-react";

import { motion }

from "framer-motion";


export default function Navbar({

onGeneratePlan

}) {

return(

<motion.nav

initial={{

y:-40,

opacity:0

}}

animate={{

y:0,

opacity:1

}}

className="bg-slate-900 border border-slate-700 rounded-3xl p-6 flex justify-between items-center"

>

<div className="flex items-center gap-4">

<div className="bg-indigo-600 p-3 rounded-2xl">

<BrainCircuit

color="white"

size={32}

/>

</div>

<div>

<h1 className="text-3xl font-bold text-white">

Deadline Guardian AI

</h1>

<p className="text-slate-400">

Smart Productivity Assistant

</p>

</div>

</div>

<button

onClick={

onGeneratePlan

}

className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition flex items-center gap-2"

>

<Sparkles size={18}/>

Generate AI Schedule

</button>

</motion.nav>

);

}