import react, {useState} from "react";



function Login({onRegister, onSubmit, onUserChange, getAllNotes, setNotes}){
const [userLogInInfo, setUserLogInInfo] = useState({email: "", password: ""});
const [newError, setNewError] = useState("");

function handleChange(event){
  const name = event.target.name;
  const value = event.target.value;

  setUserLogInInfo((prevVal)=>{
    return {
      ...prevVal,
      [name]: value
    };
  })

}

const handleFormSubmit = async (event)=>{
  event.preventDefault();
  
  const result = await onSubmit(userLogInInfo.email, userLogInInfo.password);
  
  console.log(result);
  if(result == "Wrong password"){
    
    
    setNewError(result);
    
  }
  else if(result == "User not found"){
    
    setNewError("User not found");
    
  }
  else{
    onUserChange(result);
  if(result){
    const notes = await getAllNotes(result);
    setNotes(notes);

  }

  }
  setUserLogInInfo({email: "", password: ""});
  
  
  

}


    return (
        <div>
           {(newError == "Wrong password")? <div style={{width: "40%", textAlign: "center", margin: "auto", marginTop: "20px", fontWeight: "bolder"}} className="alert alert-danger" role="alert">
            Wrong Password ! ... Try Again... :)
             </div> : (newError == "User not found")? <div style={{width: "40%", textAlign: "center", margin: "auto", marginTop: "20px", fontWeight: "bolder"}} className="alert alert-danger" role="alert">
             Wrong Email Address ! ... Try Again... :)
             </div>  : null }
        
        <form onSubmit={handleFormSubmit} id= "form" action="/login">
          <label className="form-label" htmlFor="email">Email:</label><br/>
          <input onChange={handleChange} className="form-input" type="text" id="email" name="email" required placeholder="email@gmail.com" value={userLogInInfo.email} /><br/>
          <label className="form-label" htmlFor="password">Password:</label><br/>
          <input onChange={handleChange} className="form-input" type="password" id="password" name="password" required placeholder="Password" value={userLogInInfo.password} /><br/><br/>
          <input style={{margin: "auto", justifyContent: "center", textAlign: "center", display: "block"}} className="submit-form-button" type="submit" value="Log in"/>
        </form>

        <h3 style={{textAlign: "center"}} >Not Registered Yet? <br/> <br/> Register Now : <span>)</span> </h3> <br/>
        <button onClick={()=>{onRegister()}} style={{textAlign: "center", justifyContent: "center", display: "block", margin: "auto"}}
         className="submit-form-button" >Register</button>
        
      </div>
    );
}

export default Login;