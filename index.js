const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const users = [{
  name:"Jack",
  age:28,
  kidneys:[{
    healthy:false
  },{
    healthy:true
  }]
}];

app.get('/', (req,res)=>{
  const kidneys = users[0].kidneys;
  const numberOfKidneys = users[0].kidneys.length;
  const healthyKidneys = kidneys.filter((healthy)=>{
    return healthy.healthy;
  })
  const countOfHealthyKidneys = healthyKidneys.length;
  const countOfUnhealthyKidneys = numberOfKidneys-countOfHealthyKidneys;
  res.status(200).json({numberOfKidneys,countOfHealthyKidneys,countOfUnhealthyKidneys});
});

app.post('/',(req,res)=>{
  const healthy = req.body.isHealthy;
  users[0].kidneys.push({healthy});
  res.status(200).json({msg:"Done"});
});

app.put('/',(req,res)=>{
  if(isThereAtleastOneUnhealthyKidney()){
    const kidneys = users[0].kidneys;
    kidneys.filter((healthy)=>{
    if(!healthy.healthy){
      healthy.healthy = true;
    }
  })
  res.status(200).json({msg:"Done"});
  }
  else{
    res.status(411).json({msg:"no unhealthy kidney is present."})
  }
});

app.delete('/', (req,res)=>{
  if(isThereAtleastOneUnhealthyKidney()){
    let kidneys = users[0].kidneys;
    let newKidneys = kidneys.filter((healthy)=>{
      return healthy.healthy;
    });
    console.log(newKidneys);
    users[0].kidneys = newKidneys;
    res.status(200).json({msg:"Done"});
  }
  else{
    res.status(411).json({msg:"no unhealthy kidney is present."})
  } 
});

function isThereAtleastOneUnhealthyKidney(){
  let unhealthykidney= false;
  const kidneys = users[0].kidneys;
  kidneys.forEach((kidney)=>{
    if(!kidney.healthy){
      unhealthykidney = true;
    }
  });
  return unhealthykidney;
}
app.listen(port,()=>{
  console.log(`server is listening at port ${port}..`);
})