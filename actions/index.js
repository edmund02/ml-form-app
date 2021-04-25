import {
   SAVE_FORM,
   RESET_FORM,
   UPDATE_RESET_STATUS,
} from "../constants";

// save form to redux
export const saveFormAction = (data) => ({
   type: SAVE_FORM,
   payload: data
});

// reset the form in redux
export const resetFormAction = () => ({
   type: RESET_FORM,
});

// acknowledge reset is triggered
export const updateResetStatusAction = () => ({
   type: UPDATE_RESET_STATUS,
});
