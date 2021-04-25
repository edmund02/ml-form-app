import {
   SAVE_FORM,
   RESET_FORM,
   UPDATE_RESET_STATUS,
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
