import {
   COUNTER_CHANGE,
   SAVE_FORM,
   RESET_FORM,
   UPDATE_RESET_STATUS,
   UPDATE_FORM_STATUS,
} from '../constants';


const initialState = {
   count: 0,
   form: {
      title: 'Untitled Form',
      description: '',
      questions: [],
   },
   formAvailable: false,
   formIsReset: false,
   formIsUpdated: false,
};

export default function (state = initialState, action) {
   switch (action.type) {
      case COUNTER_CHANGE:
         return {
            ...state,
            count: action.payload
         };
      case SAVE_FORM:
         alert('Form saved sucessful!');
         return {
            ...state,
            form: action.payload,
            formAvailable: true,
            formIsUpdated: true,
         }
      case RESET_FORM:
         alert('Your form is reset now!');
         return {
            ...state,
            form: initialState.form,
            formIsReset: true,
            formAvailable: false,
         }
      case UPDATE_RESET_STATUS:
         return {
            ...state,
            formIsReset: false
         }
      case UPDATE_FORM_STATUS:
         return {...state,
            formIsUpdated: false
         }
      default:
         return state;
   }
}
