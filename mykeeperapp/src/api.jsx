import react from "react";
import axios from "axios";

const getUserLogIn = async (username, password)=>{
    console.log("username:  " + username + "  password: " + password);
    
    try{
        const response = await axios.post("http://localhost:3000/login",
            {
               username: username,
               password: password
            },
            {
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
               }
           }
           );
            console.log(response.data);
       
            return response.data;


    }
    catch(error){
        if (error.response) {
            // Extract error message from the response
            console.error("Error during login:", error.response.data);
            
          }
          return error.response.data;
    }

    


}

const getUserRegister = async (username, password)=>{
    console.log("username:  " + username + "  password: " + password);

    const response = await axios.post("http://localhost:3000/register",
        {
            username: username,
            password: password
        },
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
        console.log(response.data);
   
        return response.data;

}

const getAllNotes = async (id)=>{
    console.log("ID:  " + id);

    const response = await axios.get("http://localhost:3000/notes/" + id
        
        
    );
        console.log(response.data);
   
        return response.data;

}


const createNote = async (note)=>{
    console.log(note);
    const response = await axios.post("http://localhost:3000/create",
     {
        note
     },
     {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    );
     console.log(response.data);

     return response.data;


}


const deleteNote = async (id, username) => {
    console.log(id+ "..." + username);
    try {
       const response = await axios.delete(`http://localhost:3000/delete/${id}`, 
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
              username: username, // Add `username` as a query parameter
            },
          }
        

       );
       console.log(response.data);
       return response.data;
    } catch (error) {
       console.error(error);
    }
 };

 const updateNote = async (id, title, content, user_id) =>{
  console.log(id + ".." + title + ".." + content + ".." + user_id);

  try{
    const result = await axios.put(`http://localhost:3000/update/${id}`,
      {
        title: title,
        content: content,
        user_id: user_id
      },
      {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }

    );
   console.log(result.data);
   return result.data;

  }
  catch(error){
    console.log(error);
  }

 }


export default getUserLogIn;
export {getUserRegister, getAllNotes, createNote, deleteNote, updateNote};