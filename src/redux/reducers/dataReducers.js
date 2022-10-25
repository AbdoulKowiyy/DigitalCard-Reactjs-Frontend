import { StarRate } from "@material-ui/icons";
import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT,
    SUBMIT_URLMEDIA,
    SET_ICONS,
    SET_BANKAICONS,
    SET_ILETISIMICONS,
    SET_ICON,
    POST_IKON,
    SET_IKONCHECK,
    SET_BANKICON,
    SET_ILETISIMICON,
    POST_BANKICON,
    SUBMIT_BANKAURLMEDIA,
    SUBMIT_ILETISIMURL
} from "../types";


const initialState = {
    screams: [],
    scream: {},
    socialkonlar: [],
    bankaKonlar: [],
    iletisimKonlar: [],

    bankIcon: {},
    iletIkon: {},
    ikon: {},
    loading: false,
    checkikon: false,
};

export default function(state = initialState, action) {
    switch (action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }



        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }

        case SET_ICONS:
            return {
                ...state,
                socialkonlar: action.payload,
                loading: false,


            }

        case SET_BANKAICONS:
            return {
                ...state,
                bankaKonlar: action.payload,
                loading: false,
            }
        case SET_ILETISIMICONS:
            return {
                ...state,
                iletisimKonlar: action.payload,
                loading: false,

            }

        case SET_IKONCHECK:
            return {
                ...state,
                checkikon: true
            }

        case SET_IKONCHECK:
            return initialState;


        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }

        case SET_ICON:
            return {
                ...state,
                ikon: action.payload,
            }
        case SET_BANKICON:
            return {
                ...state,
                bankIcon: action.payload
            }
        case SET_ILETISIMICON:
            return {
                ...state,
                iletIkon: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.scream.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload)
            state.scream.splice(index, 1);
            return {
                ...state
            }


        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }

        case POST_IKON:
            return {
                ...state,
                checkikon: true,
                socialkonlar: [
                    action.payload,
                    ...state.ikon
                ],

            }
        case POST_BANKICON:
            {
                return {
                    ...state,
                    bankaKonlar: [
                        action.payload,
                        ...state.bankIcon
                    ]
                }
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }

        case SUBMIT_URLMEDIA:
            return {
                // ...state,

                // ikon: {
                //     ...state.ikon,
                //     linkUrlAll: [action.payload, ...state.ikon.linkUrlAll]

                // }

            }
        case SUBMIT_BANKAURLMEDIA:
            return {
                ...state,
                bankIcon: {
                    ...state.bankIcon,
                    linkUrlAll: [action.payload, ...state.bankIcon.linkUrlAll]

                }

            }

        case SUBMIT_ILETISIMURL:
            return {
                ...state,
                iletIkon: {
                    ...state.iletIkon,
                    linkUrlAll: [action.payload, ...state.iletIkon.linkUrlAll]

                }

            }


        default:
            return state

    }
}