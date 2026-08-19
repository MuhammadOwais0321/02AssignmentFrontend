export const registererrorThrower = (responce, data) => {
  let errMsg = "";
  if (!responce.ok) {

    if (data.errors && data.errors.email) {
      errMsg = data.errors.email;
    } else if (data.errors && data.errors.password) {
      errMsg = data.errors.password;
    } else {
      errMsg = data.message;
    }
    
  }
  
  return errMsg;
};
