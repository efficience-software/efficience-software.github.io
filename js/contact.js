function onSuccess() {
	// Enable button & show success message
	$("#submit-contact").attr("disabled", false);
	$('#result').html("<div class='alert alert-success'>");
	$('#result > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
	$('#result > .alert-success')
		.append("<strong>Votre message a été envoyé, nous reviendrons vers vous dans les plus brefs délais.</strong>");
	$('#result > .alert-success')
		.append('</div>');

	//clear all fields
	$('#contact-form').trigger("reset");
}

function onError(firstName, errorMsg) {
	// Enable button & show error message
	$("#submit-contact").attr("disabled", false);
	// Fail message
	$('#result').html("<div class='alert alert-danger'>");
	$('#result > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
	$('#result > .alert-danger').append("<strong>Désolé, " + firstName + ", " + errorMsg);
	$('#result > .alert-danger').append('</div>');
	//clear all fields
	$('#contact-form').trigger("reset");
}

$(function() {
	$("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      // Prevent spam click and default submit behaviour
			$("#submit-contact").attr("disabled", true);
			event.preventDefault();

			var email = $("input#email").val(); // get email field value
			var name = $("input#name").val(); // get name field value
			var phone = $("input#phone").val(); // get name field value
			var msg = $("textarea#message").val(); // get message field value
			var firstName = name; // For Success/Failure Message
			// Check for white space in name for Success/Fail message
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}
			var txt = "Nouveau message de " + firstName + ", " + email + ", " + phone + ":\n" + msg;

			$.ajax({
		    url: "https://formspree.io/contact@efficiencesoftware.fr",
		    method: "POST",
		    data: {name: name, email: email, message: txt},
		    dataType: "json",
				success : function(code_html, statut){ // success est toujours en place, bien sûr !
          onSuccess();
				},
				error : function(resultat, statut, erreur){
					var errorMsg = "votre message n'a pas pu être envoyé à cause d'un problème technique. Essayez plus tard, ou contactez-nous par téléphone.";
					onError(firstName, errorMsg);
				}
			});
		},
    filter: function() {
        return $(this).is(":visible");
    }
  });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#result').html('');
});
