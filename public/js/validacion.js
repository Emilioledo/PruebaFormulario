$( document ).ready(function() {
});

$('#formulario').on( "submit", function(event) {
  event.preventDefault();
  // let infoFormulario = ( $( this ).serialize() ); /*Con el name en el input toma el value*/
  $.ajax({
    url: "http://localhost:3000/",
    dataType: 'json',
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({
      "nombreFormulario": $('#nombreFormulario').val(),
      "apellidoFormulario": $('#apellidoFormulario').val(),
      "emailFormulario": $('#emailFormulario').val()
    }),
    success: (data) => {
      console.log(data);
    }
  });
});



