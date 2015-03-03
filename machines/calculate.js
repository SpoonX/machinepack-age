// Basic machine meta.
var machine = {
  identity           : 'calculate',
  friendlyName       : 'Calculate',
  description        : 'Calculate an age based on date of birth.',
  extendedDescription: '',
  defaultExit        : 'success'
};

// Inputs
machine.inputs = {
  dateOfBirth: {
    example    : '1991-04-24',
    description: 'A date of birth `Date` instance or string in yyyy-mm-dd format.',
    required   : true
  }
};

// Exits
machine.exits = {
  invalidDateFormat: {
    description: 'Invalid date format supplied (expected yyyy-mm-dd or instance of Date).'
  },
  success          : {
    description: 'Returns the age based on the date of birth supplied.',
    example    : '23'
  }
};

// Function
machine.fn = function (inputs, exits) {
  var dateOfBirth = inputs.dateOfBirth;

  if (typeof dateOfBirth === 'string') {
    dateOfBirth = new Date(Date.parse(dateOfBirth));
  }

  if (!dateOfBirth instanceof Date || dateOfBirth.toString() === 'Invalid Date') {
    return exits.invalidDateFormat('Invalid date supplied.');
  }

  return exits.success(~~((Date.now() - (+dateOfBirth)) / (31557600000)));
};

// Export
module.exports = machine;
