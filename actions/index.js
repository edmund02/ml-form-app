import {
   SAVE_FORM,
   RESET_FORM,
   UPDATE_RESET_STATUS,
   UPDATE_FORM_STATUS,
} from "../constants";

export const saveFormAction = (data) => ({
   type: SAVE_FORM,
   payload: data
});

export const resetFormAction = () => ({
   type: RESET_FORM,
});

export const updateResetStatusAction = () => ({
   type: UPDATE_RESET_STATUS,
});

export const updateFormStatusAction = () => ({
   type: UPDATE_FORM_STATUS,
});