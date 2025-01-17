// Inicializa o EmailJS com a chave pública
emailjs.init("YOUR_PUBLIC_KEY"); // Substitua com sua chave pública

// A função que será chamada quando o formulário for enviado
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtém os dados do formulário
  const formData = new FormData(event.target);

  // Envia os dados para o EmailJS
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(function(response) {
      console.log('Success', response);
      alert("Mensagem enviada com sucesso!");
    }, function(error) {
      console.error('Error', error);
      alert("Erro ao enviar mensagem.");
    });
});
