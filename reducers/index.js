import {
   SAVE_FORM,
   RESET_FORM,
   UPDATE_RESET_STATUS,
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
};

export default function (state = initialState, action) {
   switch (action.type) {
      case SAVE_FORM:
         alert('Form saved sucessful!');
         return {
            ...state,
            form: action.payload,
            formAvailable: true,
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
      default:
         return state;
   }
}
