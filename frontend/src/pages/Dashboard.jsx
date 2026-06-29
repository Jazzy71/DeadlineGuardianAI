import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import AIInsight from "../components/AIInsight";
import QuickActions from "../components/QuickActions";
import AddTaskModal from "../components/AddTaskModal";
import AIChat from "../components/AIChat";

import api from "../services/api";

export default function Dashboard() {

const [tasks, setTasks] = useState([]);

const [showModal, setShowModal] = useState(false);

const [showChat, setShowChat] = useState(false);

const [aiPlan, setAiPlan] = useState("");

const [loadingAI, setLoadingAI] = useState(false);

const avgProgress =
tasks.length
?

Math.round(

tasks.reduce(

(sum, t) => sum + t.progress,

0

)

/ tasks.length

)

:

0;



useEffect(() => {

fetchTasks();

}, []);



async function fetchTasks() {

try {

const response =

await api.get("/tasks");

setTasks(response.data);

}

catch (error) {

console.log(error);

}

}



async function addTask(task) {

try {

await api.post(

"/tasks",

task

);

fetchTasks();

}

catch (error) {

console.log(error);

}

}



async function deleteTask(id) {

try {

await api.delete(

`/tasks/${id}`

);

fetchTasks();

}

catch (error) {

console.log(error);

}

}

async function updateProgress(
id,
progress
){

try{

await api.put(

`/tasks/${id}/progress`,

null,

{

params:{

progress

}

}

);

fetchTasks();

}

catch(error){

console.log(error);

}

}

async function generatePlan() {

try {

setLoadingAI(true);

const response =

await api.post(

"/generate-plan"

);

setAiPlan(

response.data.plan

);

}

catch (error) {

console.log(error);

}

finally {

setLoadingAI(false);

}

}



return (

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

<div className="max-w-7xl mx-auto p-8">

<Navbar

onGeneratePlan={generatePlan}

/>

<Hero tasks={tasks}/>



<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

<StatsCard

title="Total Tasks"

value={tasks.length}

color="text-cyan-400"

/>



<StatsCard

title="Completed"

value={

tasks.filter(

task =>

task.progress === 100

).length

}

color="text-green-400"

/>



<StatsCard

title="Due Today"

value={

tasks.filter(task => {

const today =

new Date();

const deadline =

new Date(task.deadline);

return (

deadline.toDateString()

===

today.toDateString()

);

}).length

}

color="text-red-400"

/>



<StatsCard

title="AI Score"

value={`${avgProgress}%`}

color="text-indigo-400"

/>

</div>



<div className="grid lg:grid-cols-3 gap-8 mt-14">

<div className="lg:col-span-2">

<h2 className="text-white text-3xl font-bold mb-6">

Today's Focus

</h2>



<div className="space-y-6">

{

tasks.map(task => (

<div

key={task.id}

className="relative"

>

<TaskCard

{...task}

onProgressChange={
updateProgress
}

/>

<button

onClick={() =>

deleteTask(

task.id

)

}

className="absolute top-5 right-5 text-red-400 hover:text-red-600"

>

✖

</button>

</div>

))

}

</div>

</div>



<div>

<AIInsight

plan={aiPlan}

loading={loadingAI}

/>

</div>

</div>



<div className="mt-14">

<h2 className="text-white text-3xl font-bold mb-6">

Quick Actions

</h2>



<QuickActions

onAddTask={() =>

setShowModal(true)

}

onGeneratePlan={

generatePlan

}

onChat={() =>

setShowChat(

!showChat

)

}

/>

</div>



{

showChat && (

<div className="mt-12">

<AIChat/>

</div>

)

}



</div>



<AddTaskModal

isOpen={showModal}

onClose={() =>

setShowModal(false)

}

onAddTask={

addTask

}

/>



</div>

);

}