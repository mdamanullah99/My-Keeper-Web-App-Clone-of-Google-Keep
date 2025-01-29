import react, {useState} from "react";


function Register({onSubmit, onUserChange}){

const [userRegisterInfo, setuserRegisterInfo] = useState({email: "", password: ""});

function handleChange(event){
  const name = event.target.name;
  const value = event.target.value;

  setuserRegisterInfo((prevVal)=>{
    return {
      ...prevVal,
      [name]: value
    };
  })

}

const handleFormSubmit = async (event)=>{
  event.preventDefault();
  const result = await onSubmit(userRegisterInfo.email, userRegisterInfo.password);
  onUserChange(result);

}

    return (
        <div>
        
        <form onSubmit={handleFormSubmit} id= "form" action="/register">
          <label className="form-label" htmlFor="email">Email:</label><br/>
          <input onChange={handleChange} className="form-input" type="text" id="email" name="email" required placeholder="email@gmail.com"
           value={userRegisterInfo.email} /><br/>
          <label className="form-label" htmlFor="password">Password:</label><br/>
          <input onChange={handleChange} className="form-input" type="password" id="password" name="password" required placeholder="Password"
           value={userRegisterInfo.password} /><br/><br/>
          <input style={{margin: "auto", justifyContent: "center", textAlign: "center", display: "block"}} className="submit-form-button"
           type="submit" value="Register"/>
        </form>
        
      </div>
    );
}

export default Register;