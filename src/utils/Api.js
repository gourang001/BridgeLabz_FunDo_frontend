import axios from "axios";
export const loginApiCall=async (payload)=>{
    try{
        const response=await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login',payload);

        localStorage.setItem("token",response.data.id);
        localStorage.setItem("email",response.data.email);

        return response.data;
    }
    catch(error){
        console.error("error",error.message);
        throw error;
    }
}



export const signupApiCall = async (payload)=>{
    try {
        const response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload);
        

        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export const getNotes = () => {
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const addNoteApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes', payload, {
        headers: {
            Authorization: localStorage.getItem('token')
            }
        })
}

export const archiveNoteApiCall = (payload) => {
    return axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes', payload, {
        headers: {
            Authorization: localStorage.getItem('token')
            }
        })
}


export const archiveNotesApiCall = async(payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}



export const trashNotesApiCall = async (payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
};

  export const restoreNotesApiCall = async (payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
  };


  export const deleteNoteForeverApiCall = async (payload) => {
    return await axios.post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  };


  
  export const changeColorAPI = async (payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
      payload, {
        headers: {
          Authorization: localStorage.getItem('token')
          }
        }
      );  
    }

    export const updateNoteApiCall = (payload) => {
      return axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",payload,{
          headers:{
              Authorization: localStorage.getItem('token')
          }
      })
    }

    export const setReminderApiCall = (payload) => {
      return axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addUpdateReminderNotes",payload,{
          headers:{
              Authorization: localStorage.getItem('token')
          }
      })
    }

    export const removeReminderApiCall = (payload) => {
      return axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/removeReminderNotes",payload,{
          headers:{
              Authorization: localStorage.getItem('token')
          }
      })
    }