export default {
   inputType: [
      { key: 1000, name: 'Short Answer', keyboardType: 'default' },
      { key: 1001, name: 'Paragraph', keyboardType: 'default' },
      { key: 1002, name: 'Numeric', keyboardType: 'numeric', errorMessage: `Invalid numeric input in Question {q}. \nExample: 10, 11.23, 0.001, -1`, regexp: /^-?\d+(\.{1}\d+)?$/}, 
      { key: 1003, name: 'Email', keyboardType: 'email-address', errorMessage: `Invalid email in Question {q}. \nExample: edmund@moneylion.com`, regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
      { key: 1004, name: 'Boolean' },
      { key: 1005, name: 'Checkboxes' },
      { key: 1006, name: 'Date' },
   ]
}