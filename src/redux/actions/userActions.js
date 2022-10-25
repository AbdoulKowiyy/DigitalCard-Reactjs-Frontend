
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from "../types";
import axios from "axios";


//THİS THE USER action
export const loginUser = (veriData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios
        .post("/login", veriData)
        
        .then((res) => {
           

            setAuthorizationHeader(res.data.TokenGiris)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            
        })
        .catch((err) => {
           
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.hatakisigiris,
            })

            if(err.response.data.hata){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.hata,
                })
            }
         if(err.response.data.err){
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.err,
            })
         }
            

        });

}

//urltanim url tanımla

export const loginUserUrlTanimla = (veriData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios
        .post("/girisyapurlTanimla", veriData)
        
        .then((res) => {
           
            setAuthorizationHeader(res.data.TokenGiris)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            dispatch(getUserData());
        })
        .catch((err) => {
           
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.hatakisigiris,
            })

            if(err.response.data.hata){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.hata,
                })
            }
         if(err.response.data.err){
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.err,
            })
         }

        });

}


//upload Image
export const uploadImage=(formData)=>(dispatch)=>{
    dispatch({type:LOADING_USER})
   
    axios.post("/uploadProfile",formData).then(()=>{
        console.log("resim geldi")
        dispatch(getUserData());
    }).catch((err)=>{
        console.log("Resim Ekleme Hatası: ",err)
    }
    )

}

//backgorundImeg
export const uploadBackgroundImage=(formData)=>(dispatch)=>{

    dispatch({type:LOADING_USER})
   
    axios.post("/uploadBackgorund",formData).then(()=>{

        
        dispatch(getUserData());
    }).catch((err)=>{
        console.log("Resim Ekleme Hatası: ",err)
    }
    )

}


//logout actions

export const logoutUser = ()=> (dispatch)=>{

    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type:SET_UNAUTHENTICATED});
    
    

}

//Kullanıcı bilgileri getir;
export const getUserData = () => (dispatch) => {

    dispatch({type:LOADING_USER});
    axios.get("/kullanici/getir").then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
          });
        })
        .catch(err => console.log("buyuk hata var: ", err))  
        
        
}




//THİS THE USER action
export const signUpUser = (veriData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios
        .post("/kaydol", veriData)
        .then((res) => {
           
            setAuthorizationHeader(res.data.taken)
            
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
           console.log("hata vara buarad: ", err.response.data.hata)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.hatalar
            })

            if(err.response.data.userHandle){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.userHandle,
                })
            }
            if(err.response.data.GenelHata){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.GenelHata,
                })
            }

            if(err.response.data.hata){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.hata,
                })
            }

        });

}

//signUp user to the On Url Tanimları

export const signUpUserOnTanimUrl = (veriData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios
        .post("/kaydolUrlTanimla", veriData)
        .then((res) => {
           
            setAuthorizationHeader(res.data.taken)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data.hatalar
            })

        });

}



//kullanıcı bilgileri güncelleme
export const editUserDetails=(userDetails)=>(dispatch)=>{
 dispatch({type: LOADING_USER});
 axios.post("/kullanici/bilgiyukle", userDetails)
 .then(()=>{
     dispatch(getUserData());
 })
 .catch(err=> console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));


}

// hesap sil
export const hesapSilAll=()=>(dispatch)=>{

    axios.delete("/kulsil/sil").then(()=>{
        console.log("here burada")
        dispatch(logoutUser());

    }).catch(err=> console.log("kullanıcı silme sıkıntısı: ", err));
   
}

//Fatura Bilgileri Güncelle
export const editUserFatura=(userDetails)=>(dispatch)=>{
    dispatch({type: LOADING_USER});
    axios.post("/kullanici/faturaEkle", userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=> console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));
   
   }

   


//kulanıcı bilgi yükle güncelle
export const editUserBilgi=(userDetails)=>(dispatch)=>{
    dispatch({type: LOADING_USER});
    axios.post("/kullanici/bilgiyukle", userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=> console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));
   
   }

   //Gece Moduna geç
   export const geceModuna=(userDetails)=>(dispatch)=>{
       
    dispatch({type: LOADING_USER});
    axios.post("/kullanici/geceModu", userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=> console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));
   
   }

   ///profil kapat yada aç
   export const profilKapa=(userDetails)=>(dispatch)=>{
    dispatch({type: LOADING_USER});
    axios.post("/kullanici/profilKapa", userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=> console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));
   
   }


const setAuthorizationHeader =(token)=>{

    const FBIdToken = `Bearer ${token}`

    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    
}

//Notifications 
export const markNotificationsRead=(notificationIds)=>(dispatch)=>{


    axios.post("/bildirimler",notificationIds).then((res)=>{
        dispatch({
            type:MARK_NOTIFICATIONS_READ
        })
    }).catch(err=>{
        console.log(err);
    })
}