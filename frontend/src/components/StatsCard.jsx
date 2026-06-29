export default function StatsCard({

title,

value,

color

}){

return(

<div className="bg-slate-900 rounded-3xl p-6 border border-slate-700 hover:border-indigo-500 hover:-translate-y-1 transition duration-300">

<p className="text-slate-400">

{title}

</p>

<h1 className={`text-5xl font-bold mt-3 ${color}`}>

{value}

</h1>

</div>

)

}