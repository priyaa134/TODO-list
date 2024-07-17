let tasks=[];

const addTask = () => {
    const taskItem=document.getElementById("taskinput");
    const text= taskItem.value.trim();

    if(text) {
        tasks.push({text:text ,completed:false});

        updateTasksList();
        updateStats();
    }
    taskItem.value='';
};

const toggletaskcomplete = (index) => {
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateStats();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
}
document.getElementById('delete-all').addEventListener("click", () => deleteall());

const deleteall = () => {
  tasks.splice(0,tasks.length);
}

const editTask = (index) => {
    const taskInput=document.getElementById('taskinput');
    taskInput.value=tasks[index].text;

    tasks.splice(index,1);
    updateTasksList();
    updateStats();
};


const updateStats = () =>{
    const completedtasks=tasks.filter(task=> task.completed).length;
    const totaltasks=tasks.length;
    const progress=(completedtasks/totaltasks)*100;
    const progressbar=document.getElementById('progress');
    progressbar.style.width= `${progress}%`;

    document.getElementById("stats").innerText = `${completedtasks} / ${totaltasks}`;

    if(tasks.length && completedtasks === totaltasks) {
        blastconfetti();
    }

};



const updateTasksList = () =>  {
    const tasklist=document.getElementById("task-list");
    tasklist.innerHTML= ''
    
    tasks.forEach ((task ,index) => {
        const listItem=document.createElement('li')

        listItem.innerHTML= `
    <div class="task-items">
        <div class="task ${task.completed ? "completed":""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked":""} style="margin-left:10px;">
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="images/edit icon.png" onClick="editTask(${index})">
            <img src="images/delete icon.png" onClick="deleteTask(${index})">
        </div>
    </div>`;

    listItem.addEventListener('change', () => toggletaskcomplete(index))
    tasklist.append(listItem);
    });
}

document.getElementById("newtask").addEventListener("click" ,function(e){
    e.preventDefault();

    addTask();
});

const blastconfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};