export const formatDate = (date) => {
   let dd = date.getDate();
   const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
   ];
   const mm = monthNames[date.getMonth()]; // January is 0!
   const yyyy = date.getFullYear();

   if (dd < 10) {
      dd = '0' + dd;
   }

   return dd + ', ' + mm + ' ' + yyyy;
}