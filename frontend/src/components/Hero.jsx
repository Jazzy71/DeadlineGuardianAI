export default function Hero({ tasks }) {

const hour = new Date().getHours();

let greeting = "";

if(hour < 12){

greeting = "Good Morning ☀️";

}

else if(hour < 17){

greeting = "Good Afternoon 👋";

}

else if(hour < 21){

greeting = "Good Evening 🌆";

}

else{

greeting = "Good Night 🌙";

}

const today = new Date();

const dueToday = tasks.filter(task=>{

const deadline = new Date(task.deadline);

return (

deadline.toDateString()

===

today.toDateString()

);

}).length;


return(

<div className="mt-10">

<h1

className="
text-5xl
font-bold
text-white
"

>

{greeting}

</h1>

<p

className="
text-slate-400
text-lg
mt-3
"

>

AI analyzed your schedule.

</p>

<p

className="
text-indigo-300
mt-2
"

>

You have

{" "}

<span className="font-bold">

{dueToday}

</span>

 upcoming deadline

{dueToday !== 1 ? "s" : ""}

today.

</p>

</div>

);

}