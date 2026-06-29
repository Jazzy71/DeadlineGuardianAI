import {

Plus,

Sparkles,

MessageCircle

}

from "lucide-react";


export default function QuickActions({

onAddTask,

onGeneratePlan,

onChat

}) {


return(

<div className="grid md:grid-cols-3 gap-5">


<button

onClick={

onAddTask

}

className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl p-5 font-semibold flex justify-center items-center gap-2 transition"

>

<Plus/>

Add Task

</button>



<button

onClick={

onGeneratePlan

}

className="bg-purple-600 hover:bg-purple-500 text-white rounded-2xl p-5 font-semibold flex justify-center items-center gap-2 transition"

>

<Sparkles/>

Generate AI Plan

</button>



<button

onClick={

onChat

}

className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl p-5 font-semibold flex justify-center items-center gap-2 transition"

>

<MessageCircle/>

AI Chat

</button>


</div>

);

}