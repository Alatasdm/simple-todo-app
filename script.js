
        let taskList = []
        if(localStorage.getItem("taskList") !== null){
            taskList = JSON.parse(localStorage.getItem("taskList"))
        }

        let taskInputArea = document.getElementById("taskInputArea");
        let editMode = false;
        let editId;
        const filters = document.querySelectorAll(".filters span");

        

        displayTasks("all")


        function displayTasks(filter){
            let ul = document.getElementById("taskArea");
            
            ul.innerHTML = ""; // veri tekrarı olmaması için boş değer atıyoruz.

            

            if (taskList == ""){
                ul.insertAdjacentHTML("beforeend","<p class=' mt-0 p-3'>You haven't got any tasks.</p>")
            }
                else{


                    for(let task of taskList){
                        
                        
                        let taskControl = task.status == "completed"?"checked":"pending";
                        
                        if(filter == task.status || filter == "all"){
                            

                            
                            let li = `<li class="task list-group-item">
                                <div class="form-check">
                                    <input onclick="changeStatus(this,${task.id})" type="checkbox" id="${task.id}" class="form-check-input" ${taskControl}>
                                    <label for="${task.id}" class='${taskControl}' >${task.taskName}</label>
                                    </div>
                                    <div class="dropdown">
                                        <button class="btn btn-link dropdown-toggle float-end" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><a onclick="editTask(${task.id},'${task.taskName}')" class="dropdown-item" href="#"> Edit</a></li>
                                                <li><a onclick="deleteTask(${task.id})" class="dropdown-item" href="#"> Delete</a></li>
                                                
                                                </ul>
                                                </div>
                                                </li>`
                                                
                                                ul.insertAdjacentHTML("beforeend",li);
                            }
                        
                    }
                }

        }

        for(let span of filters){
            span.addEventListener("click",function(){
                document.querySelector("span.active").classList.remove("active");
                span.classList.add("active");
                displayTasks(span.id);

            })            
        }

        function newTask(){
            if(taskInputArea.value == ""){
                alert("Please Enter a Task")
            }
            else{
                if(!editMode){

                    taskList.push(
                    {
                        "id":taskList.length+1,
                        "taskName":taskInputArea.value,
                        "status":"pending"
                        
                    }
                    )
                }
                else
                {
                    for(let task of taskList){
                        if(task.id == editId){
                            task.taskName = taskInputArea.value;
                        }
                        editMode=false;
                    }
                }
            }
            taskInputArea.value="";  
            displayTasks(document.querySelector("span.active").id);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            
            
            
        }

        addEventListener("keypress",function(event){
            event.key == "Enter" ? newTask() : ""
        })

        function clearAll(){
            taskList.splice(0,taskList.length)
            displayTasks(document.querySelector("span.active").id);
            localStorage.setItem("taskList", JSON.stringify(taskList));

        }

        function deleteTask(taskId){
            
            for(index in taskList){
                if(taskList[index].id == taskId){
                    taskList.splice(taskList[index],1)
                }
                
            }
            displayTasks(document.querySelector("span.active").id);
            localStorage.setItem("taskList", JSON.stringify(taskList));


        }

        function editTask(taskId,taskName){
            editId = taskId;
            editMode = true;
            taskInputArea.value = taskName;
            taskInputArea.focus();
            taskInputArea.classList.add("active");
        }
        
        function changeStatus(chcbox,taskId){
            let label = chcbox.nextElementSibling;
            let status;
            
            // console.log(chcbox)
            if(chcbox.checked == true){      
                label.classList.add("checked")    
                status = "completed";        
            }
            else{
                label.classList.remove("checked")      
                status = "pending";         
            }
            for(task of taskList){
                if(task.id == chcbox.id){
                    task.status = status;
                }
            }
            localStorage.setItem("taskList", JSON.stringify(taskList));
            displayTasks(document.querySelector("span.active").id)
            console.log(taskList)
        }
