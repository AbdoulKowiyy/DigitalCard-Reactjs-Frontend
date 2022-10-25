import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    SET_SCREAM,
    SET_ICON,
    POST_IKON,
    SET_IKONCHECK,
    SET_ICONS,
    SUBMIT_URLMEDIA,
    SET_BANKAICONS,
    SET_ILETISIMICONS,
    SUBMIT_ILETISIMURL,
    SUBMIT_BANKAURLMEDIA

} from "../types";
import axios from "axios";


//GETall Scream
export const getScrreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get("/crier").then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

//getAll ikons 
export const getIkonlar = () => dispatch => {

    dispatch({ type: LOADING_DATA });
    axios.get("/allikons").then(res => {
            dispatch({
                type: SET_ICONS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ICONS,
                payload: []
            })
        })
}

//get banka ikons
export const getBankaIkonlar = () => dispatch => {

    dispatch({ type: LOADING_DATA });
    axios.get("/bankakons").then(res => {
            dispatch({
                type: SET_BANKAICONS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_BANKAICONS,
                payload: []
            })
        })
}

//get all iletişim ikons
export const getIletisimIkonlar = () => dispatch => {

    dispatch({ type: LOADING_DATA });
    axios.get("/iletisimkons").then(res => {
            dispatch({
                type: SET_ILETISIMICONS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ILETISIMICONS,
                payload: []
            })
        })
}




//get Scream
export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/crier/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};

//get ikon burada
export const getIkon = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/ikon/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_ICON,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};


//Post a cream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post("/createcrier", newScream).then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch(clearErrors())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })

}

//just whatsapp
export const submitWhatsappUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/whatsapp/${screamId}/whatsapUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_URLMEDIA,
        //     payload: res.data,
        // })
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//justa telegram
export const submittelegramUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/telegram/${screamId}/telegramUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_URLMEDIA,
        //     payload: res.data,
        // })
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//instagrma


export const submitinstagramUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/insta/${screamId}/instaUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_URLMEDIA,
        //     payload: res.data,
        // })
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//twitter
export const submitwitterUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/twitter/${screamId}/twitterUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_URLMEDIA,
        //     payload: res.data,
        // })
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//facebook
export const submitFacebookUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/facebook/${screamId}/facebookUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_URLMEDIA,
        //     payload: res.data,
        // })
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//sumit a url for social media
export const submitSocailMediaUrl = (screamId, urlData) => (dispatch) => {
    axios.post(`/ikon/${screamId}/postUrl`, urlData).then((res) => {
        console.log("okgby")
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const editUserSocialkonlar = (urlId, userDetails) => (dispatch) => {
    axios.post(`/kullanici/${urlId}/editUSerfo`, userDetails).then((res) => {
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch((err) => console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));

}

//edit constct Info here
export const editUserConatactkonlar = (urlId, userDetails) => (dispatch) => {
    axios.post(`/kullanici/${urlId}/editContactInfo`, userDetails).then((res) => {
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch((err) => console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));

}

//edit banka Info 

export const editUserBankakonlar = (urlId, userDetails) => (dispatch) => {
    axios.post(`/kullanici/${urlId}/editbanaka`, userDetails).then((res) => {
        dispatch(clearErrors());
        dispatch(getIkonlar())
    }).catch((err) => console.log("kullanıcı bilgileri güncelleme sıkıntısı: ", err));

}

//Submit Info Banka

export const submitBankaMediaInfo = (screamId, urlData, ) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post(`/ikonbankaUrl/${screamId}/postbankaUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_BANKAURLMEDIA,
        //     payload: res.data
        // })
        dispatch(clearErrors())
        dispatch(getBankaIkonlar())

    }).catch(err => {
        console.log("bir hata var: ", err.response.data.Hata1)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })

}


//submit url for iletişim

export const submitContactMediaUrl = (screamId, urlData, ) => (dispatch) => {

    dispatch({ type: LOADING_UI })
    axios.post(`/ikoniletisimUrl/${screamId}/postiletismUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_ILETISIMURL,
        //     payload: res.data
        // })
        dispatch(clearErrors())
        dispatch(getIletisimIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const submitContactOnly = (screamId, urlData, ) => (dispatch) => {

    dispatch({ type: LOADING_UI })
    axios.post(`/contactonlyUrl/${screamId}/postcontactonlyUrl`, urlData).then((res) => {
        // dispatch({
        //     type: SUBMIT_ILETISIMURL,
        //     payload: res.data
        // })
        dispatch(clearErrors())
        dispatch(getIletisimIkonlar())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}




//post ikon URL
export const postIkonUrl = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post("/createinstagram", newScream).then(res => {
        dispatch({
            type: POST_IKON,
            payload: res.data
        })
        dispatch({ type: SET_IKONCHECK })
        dispatch(clearErrors())
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
        })
    })

}


//get and  ikon and Url socialMedia

export const getSocialKkonsUrl = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/socialKonsandUrl/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_ICON,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });

        })
        .catch((err) => console.log("social getir hatasi:", err));

};

//Like scream

export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/crier/${screamId}/begen`).then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}

//unlike scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/crier/${screamId}/begenme`).then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    }).catch(err => console.log(err));
}

//SUBMİT COMMENT
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/crier/${screamId}/postcomment`).then((res) => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}


//delete scream
export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/crier/${screamId}`).then(() => {
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    }).catch(err => console.log(err))
}


//clear errprs

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}


//kullancı arayüz getir
export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/kullanici/${userHandle}`).then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    }).catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })


    })
}

// Ön Linki tanımlananı getir