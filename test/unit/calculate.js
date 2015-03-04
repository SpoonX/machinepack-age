var machine = require('../../index'),
    assert  = require('chai').assert;

describe('.calculate()', function () {
  it('should calculate the correct age for the author.', function (done) {
    machine.calculate({dateOfBirth: '1991-04-24'}).exec({
      success          : function (age) {
        assert.strictEqual(age, 23, 'Age does not equal expected age.');

        done();
      },
      invalidDateFormat: function () {
        throw 'This method should not be called!';
      }
    });
  });

  it('should calculate the correct age using an instance of Date.', function (done) {
    machine.calculate({dateOfBirth: new Date(1991, 5, 24)}).exec({
      success          : function (age) {
        assert.equal(age, 23, 'Age does not equal expected age.');

        done();
      },
      invalidDateFormat: function () {
        throw 'This method should not be called!';
      }
    });
  });

  it('should fail because an invalid date format was supplied', function (done) {
    machine.calculate({dateOfBirth: 'bacon'}).exec({
      success          : function () {
        throw 'This method should not be called!';
      },
      invalidDateFormat: function (error) {
        assert.equal(error, 'Invalid date supplied.', 'Did not get expected error.');

        done();
      }
    });
  });
});
