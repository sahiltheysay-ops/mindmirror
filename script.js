// Questions
const questions=[
"I am the life of the party.","I feel comfortable around people.","I start conversations easily.","I talk to many different people at social events.","I don’t mind being the center of attention.","I am quiet around strangers.","I prefer to stay in the background.","I don’t talk a lot.",
"I sympathize with others’ feelings.","I take time out for others.","I feel others’ emotions.","I have a soft heart.","I am interested in people.","I insult people sometimes.","I am not really interested in others.","I feel little concern for others.",
"I get chores done right away.","I like order.","I follow a schedule.","I pay attention to details.","I am always prepared.","I make a mess of things.","I often forget to put things back.","I shirk my duties.",
"I get stressed out easily.","I worry about things.","I get upset easily.","I change my mood a lot.","I have frequent mood swings.","I get irritated easily.","I feel anxious sometimes.","I often feel blue.",
"I have a vivid imagination.","I have excellent ideas.","I am quick to understand things.","I use difficult words.","I spend time reflecting on things.","I have a rich vocabulary.","I am full of ideas.","I enjoy thinking about abstract ideas.","I enjoy trying new and different things.","I like to learn about new topics.","I enjoy creative activities.","I like exploring new perspectives."
];

let current=0;
let answers=[];
const total=questions.length;
const progress=document.getElementById("progress");
const qCount=document.getElementById("q-count");

// Personality types
const personalityTypes=[
{type:"The Explorer",desc:"Curious, open-minded, enjoys new experiences."},
{type:"The Strategist",desc:"Analytical, organized, goal-oriented."},
{type:"The Visionary",desc:"Creative, imaginative, loves abstract ideas."},
{type:"The Analyst",desc:"Logical, detail-focused, reflective."},
{type:"The Harmonizer",desc:"Empathetic, cooperative, people-oriented."}
];

// Show question
function showQuestion(){
document.getElementById("question").innerText=`Q${current+1}. ${questions[current]}`;
qCount.innerText=`Q${current+1} / ${total}`;
let optionsDiv=document.getElementById("options");
optionsDiv.innerHTML="";
["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"].forEach((opt,i)=>{
let btn=document.createElement("button");
btn.innerText=opt;
btn.onclick=()=>answer(5-i);
optionsDiv.appendChild(btn);
});
progress.style.width=`${Math.round((current/total)*100)}%`;
}

// Answer selection
function answer(score){
answers.push(score);
current++;
if(current<total) showQuestion();
else showResult();
progress.style.width=`100%`;
}

// Calculate trait average
function avg(start,end){
let total=0;
for(let i=start;i<=end;i++){total+=answers[i-1];}
return total/(end-start+1);
}

// Show result
function showResult(){
document.getElementById("quiz").style.display="none";
document.getElementById("result").style.display="block";

let extraversion=avg(1,8);
let agreeableness=avg(9,16);
let conscientiousness=avg(17,24);
let neuroticism=avg(25,32);
let openness=avg(33,44);

// Radar chart
new Chart(document.getElementById("chart"),{
type:"radar",
data:{
labels:["Extraversion","Agreeableness","Conscientiousness","Neuroticism","Openness"],
datasets:[{label:"Personality Profile",data:[extraversion,agreeableness,conscientiousness,neuroticism,openness],backgroundColor:"rgba(76,111,255,0.2)",borderColor:"#4c6fff",borderWidth:2}]
},
options:{responsive:true,scales:{r:{beginAtZero:true,min:0,max:5}}}
});

// Assign personality type
let maxTrait=Math.max(extraversion,agreeableness,conscientiousness,neuroticism,openness);
let typeIndex=Math.floor(Math.random()*personalityTypes.length);
let type=personalityTypes[typeIndex];

document.getElementById("summary").innerText=`You are "${type.type}": ${type.desc} You scored highest on ${["Extraversion","Agreeableness","Conscientiousness","Neuroticism","Openness"][[extraversion,agreeableness,conscientiousness,neuroticism,openness].indexOf(maxTrait)]}.`;

// Share button ready (functionality can be added later)
document.getElementById("shareBtn").onclick=()=>{
alert("Share functionality coming soon!");
}

}

// Initialize
showQuestion();
