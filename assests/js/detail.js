console.log('this is my first website');
let add = document.getElementById('add');
let addpage = document.getElementById('addwindow');
let habit = document.getElementById('habitval');
let habitdescription = document.getElementById('habitdescription');
let cancel = document.getElementById('Cancel');
add.addEventListener('click', (event)=>{
    addpage.style.display = 'flex';
})
if(habit.val == ''){
    alert('Add Habit Name');
}
cancel.addEventListener('click', (event)=>{
    addpage.style.display = 'none';
})
