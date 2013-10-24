(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr,
      formIsValid, handleErrors, registerUser;

  formIsValid = function() {
    var errors = false,
        notEmptyFields = [
          'first_name',
          'last_name',
          'email',
          'password',
          'company',
          'address1',
          'city',
          'region',
          'zipcode',
          'phone'
        ],
        confirmFields = [
          'password'
        ];

    //Check not empty.
    for(var i=0; i < notEmptyFields.length; i++) {
      var field = $('#' + notEmptyFields[i]),
          parent = field.parent();

      if(!$.trim(field.val())) {
        handleErrors(parent, '{{ escapeQuotes errorEmpty }}');
        errors = true;
      } else {
        handleErrors(parent);
      }
    }

    // Check confirmation fields
    for(i=0; i < confirmFields.length; i++) {
      var field = $('#' + confirmFields[i]),
          confirmField = $('#' + confirmFields[i] + '_confirmation'),
          parent = confirmField.parent();

      if(field.val() != confirmField.val()) {
        errors = true;
        handleErrors(parent, '{{ escapeQuotes errorBadMatch }}');
        continue;
      }
      handleErrors(parent);
    }

    if(!$('#terms_agreement').is(':checked')) {
      errors = true;
      alert('{{ escapeQuotes errorNoTerms }}');
    }
    return !errors;
  };


  handleErrors = function(parent, message) {
    var errorText = parent.find('small');
    if(message) {
      if(!errorText.length) {
        parent.addClass('error').append('<small>' + message + '</small>');
      }
    } else {
      parent.removeClass('error');
      $.each(errorText, function(i, item) { $(item).remove();});
    }
  };

  registerUser = function(account, user) {
    var params, aCall, url;

    params = {
      'Method': 'signup',
      'Service': 'HasOffers',
      'account': account,
      'user': user
    };

    url = 'http://{{escapeQuotes networkId}}.hasoffers.com/users/signup_affiliate_custom_jsonp';
    aCall = $.ajax({
      'type': 'GET',
      'url': url,
      'dataType': 'jsonp',
      'async': false,
      'data': params,
      'fail': function(res) {
        alert('{{ escapeQuotes errorServer }}');
      }
    });

    aCall.done(function(res) {
      var panel = $('#error_panel'),
          errorsText = $('#general_errors');
      errorsText.hide();
      panel.html(''); //Clear existing errors.


      if(res.RequestStatus === -1) {
        var errors = res.RequestErrors,
            alerts = [];
        errorsText.show();

        $.each(errors, function(idx, error) {
          alerts.push('<div class="alert-box alert">' + error.err_msg + '</div>');
        });
        panel.html(alerts.join(' '));
      } else {
        var msg = '';
        if(res.AffiliateStatus === 'active') {
          msg = '{{ escapeQuotes successApproved }}';
        } else {
          msg = '{{ escapeQuotes successPending }}';
        }

        //Show the modal window.
        $('#successMessage').html(msg);
        $('#successModal').reveal();
      }
    });
  };



  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $('#send').click(function() {
      if(!formIsValid()){ return false; }
      var account, user;
      //build out the query object in a way that allows us to expand the field count later.
      user = {
        'first_name': '',
        'last_name': '',
        'email': '',
        'title': '',
        'password': '',
        'password_confirmation': '',
        'terms_agreement': 0
      };

      account = {
        'company': '',
        'phone': '',
        'country': '',
        'address1': '',
        'address2': '',
        'city': '',
        'region': '',
        'zipcode': ''
      };

      for(var key in account) {
        account[key] = $('#' + key).val();
      }
      for(var key in user) {
        user[key] = $('#' + key).val();
      }

      registerUser(account, user);
      return false;
    });

  });


})(jQuery, this);
