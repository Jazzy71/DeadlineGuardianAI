import {useState} from "react";
import api from "../services/api";

export default function AIChat(){

const [message,setMessage]=useState("");

const [reply,setReply]=useState("");

const [loading,setLoading]=useState(false);

async function sendMessage(){

if(!message)return;

setLoading(true);

try{

const response=

await api.post(

"/chat",

{

message

}

);

setReply(

response.data.reply

);

}

catch(error){

console.log(error);

}

setLoading(false);

}

return(

<div
className="bg-slate-900 rounded-3xl p-6 border border-slate-700"
>

<h2
className="text-white text-2xl font-bold"
>

AI Chat

</h2>

<textarea

value={message}

onChange={(e)=>

setMessage(

e.target.value

)

}

placeholder="Ask anything..."

className="w-full mt-5 p-4 rounded-xl bg-slate-800 text-white"

rows="4"

/>

<button

onClick={sendMessage}

className="mt-4 bg-cyan-600 px-5 py-3 rounded-xl text-white"

>

{

loading

?

"Thinking..."

:

"Send"

}

</button>

{

reply && (

<div

className="mt-6 bg-slate-800 p-5 rounded-xl"

>

<p className="text-white">

{reply}

</p>

</div>

)

}

</div>

)

}