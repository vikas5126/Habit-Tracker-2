const User = require('../models/users');
const Habit = require('../models/habit');
const moment = require('moment');
let date = new Date()
let time = date.getMonth() + ' ' + date.getDate();
let end = date.getMonth() + ' ' + date.getDate()+7;
let userid ;

module.exports.home = function(req, res){
    User.findById({_id: req.params.id}).populate('habits').then((user)=>{
        if(!user){
            return res.status(404).send("User is not found");
        }
        userid = req.params.id;
        return res.render('detail', {
            title: "detailview",
            habitList: user.habits || [],
        });
    }).catch((err)=>{
        console.log("error in rendering home of info", err);
    });
}
module.exports.home2 = function(req, res){
    return res.render('detail',{
        title: "detailview",
    });
}
module.exports.add = async function(req, res){
    let today1 = new Date();
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let date = new Date();
   // array list that stored last 7 days actions records
    let arr = [];

   // loop for only last 7 days from today
    for (let d = 6; d >= 0; d--) {
      const previous = new Date(date.getTime());
      previous.setDate(date.getDate() + d);
      let dateStr = previous.toString().split(" ");

      // making the previous date
      let tempDate =  dateStr[2] + " " + dateStr[1];
      let action = "none";
     arr.push({ date: tempDate, action: action});
    }
    arr.reverse();
    try{
        let habit = await Habit.create({
            habitname: req.body.habitname,
            // description: req.body.description,
            user: req.user._id,
            start: arr,
            current_streak: 0,
            best_streak: 0,
            success_days: 0,
            completions: {
                
            }
        });
        var start = moment(habit.start, "MM / DD / YYYY");
        var end = moment(habit.end, "DD / MM / YYYY");
        var today = moment(new Date(), "DD / MM / YYYY");

        let totalDaysTillDate = today.diff(start, "days");
        let totalDays = end.diff(start, "days");

        let completionsMap = new Map();
        for(let d=0; d <= totalDays; d++){
            var new_date = moment(habit.start, "DD/MM/YYYY");
            let date = new_date.add(d, "days").format("DD / MM / YYYY");
            completionsMap.set(date, "None");
        }
        // console.log(req.user.id);
        await Habit.updateOne(
            {_id: habit._id}, {
                $set: {
                    completions: completionsMap,
                    totalDaysTillDate: totalDaysTillDate,
                },
            }
        );

        const user = await User.findById({_id: req.user._id});
        user.habits.unshift(habit);
        user.save();
        // let url = req.user.id;
        // return res.redirect(`http://localhost:8000/info/${url}`);
        return res.redirect('/');
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.takeAction = async function(req, res){
    // finding the habit by ID
    // console.log(req.body.dayBefore);
    let date = req.body.dayBefore;
    const habit = await Habit.findById(req.params.id);
    

    let arr = habit.start;
    for(let i=0; i<7; i++){
        if(arr[i].date == date){
            if(arr[i].action == "none"){
                arr[i].action = "done";
            }
            else if(arr[i].action == "done"){
                arr[i].action = "not-done";
            }
            else{
                arr[i].action = "none";
            }
        }
        
    }
 
    // calculate the records
    let success = 0;
    for(let i=0; i<7; i++){
        if(arr[i].action == 'done'){
            success++;
        }
    }

    await Habit.updateOne(
       { _id: req.params.id },
       {
          $set: {
            start : arr,
            success_Days: success,
          },
       }
    );
 
    return res.redirect("/");
 };
 

module.exports.deletehabit = async function(req, res){
    // console.log(req.params.id);
   try{
        let habit = await Habit.findByIdAndDelete({_id:req.params.id});
        //    const user = await User.findById({_id: userid});
        // habit.remove;
        let remo = await User.findByIdAndUpdate(userid, {
            $pull : {habits: req.params.id},
        });
        return res.redirect('/');
   }
   catch(error){
    console.error(error);
   }
}
