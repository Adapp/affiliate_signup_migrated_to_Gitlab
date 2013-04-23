(function(ng){
  ng.module('signup.services', []).factory('customFormFields', function() {
    var defaults = {
      'headingHeadline': 'Affiliate Signup',
      'headingHeadlineMessage': ['Sign up to become an affiliate today.',
          'We have an automated signup process to get you approved',
          'and logged into our affiliate network quickly.'].join(' '),
      'headingUserDetails': 'User Details',
      'headingAccountDetails': 'Account Details',
      'userFirstName': 'First Name',
      'userLastName': 'Last Name',
      'userTitle': 'Title',
      'userEmail': 'Email Address',
      'userPassword': 'Password',
      'userPasswordConfirm': 'Confirm Password',
      'accountCompany': 'Company Name',
      'accountCountry': 'Country',
      'accountAddress1': 'Address 1',
      'accountAddress2': 'Address 2',
      'accountCity': 'City',
      'accountRegion': 'State/Province/Region',
      'accountZipCode': 'Zip/Postal Code',
      'accountPhone': 'Phone Number',
      'accountTerms': 'Agree to terms and conditions?',
      'accountSignUp': 'Sign Up',
      'successApproved': 'Thank you for signing up. Your affiliate account is now active. You can login at http://demo.hasoffers.com',
      'successPending': 'Thank you for signing up. Your affiliate application is pending. Please wait for us to contact you.',
      'errorGeneral': 'Invalid submission. Please fix the following errors and resubmit the form.',
      'errorNoTerms': 'You must agree to the terms and conditions before signing up.',
      'errorBadMatch': 'Fields do not match.',
      'errorEmpty': 'Field cannot be empty.',
      'errorServer': 'There was an error communicating with the server. Please try again later.'
    };
    
    var fields = ng.copy(defaults);

    //The network pieces shouldn't be reset, so lets not include them in the defaults..
    fields.networkId = '';
    fields.networkToken = '';

    fields.reset = function() {
      // This for loop is way faster than using the extend method from jq or angular since we need no type checking.
      for(var p in defaults) {
        fields[p] = defaults[p];
      };
    };

    return fields;
  });
})(angular);
