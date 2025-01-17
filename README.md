# Anna Bella Agency

**Anna Bella Agency** é um site informativo para promover os serviços da agência de modelos e influenciadores. O site inclui informações sobre os serviços oferecidos pela agência e um formulário para captação de leads e talentos. A aplicação é construída utilizando **HTML** e **CSS** puros, sem dependências de frameworks JavaScript.

## Sumário

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Como Integrar o EmailJS com o Seu Formulário](#como-integrar-o-emailjs-com-o-seu-formulário)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

Este site serve como uma **landing page** informativa para a **Anna Bella Agency**, uma agência especializada em modelos e influenciadores. O objetivo principal é fornecer informações sobre os serviços da agência e permitir o primeiro contato de leads e talentos interessados.

![Logo Anna Bella Agency](imagens/logo.png)

### Funcionalidades
- Exibição de informações sobre os serviços da agência.
- Formulário para captação de leads e talentos.
- Envio do formulário para um e-mail via **EmailJS**.
- Design responsivo, garantindo boa visualização em dispositivos móveis e desktop.

#### Hero(Descktop)
<img src="imagens/landing-page.png" alt="Landing Page" width="600" class="mb-2" />

#### Hero(mobile)
<img src="imagens/landing-page-mobile.png" alt="Landing Page Mobile" width="300" />

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/anna-bella-agency.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd anna-bella-agency
   ```

3. Abra o arquivo `index.html` em seu navegador preferido:
   ```bash
   open index.html
   ```

4. Ou utilize qualquer servidor local, como o **Live Server** no VSCode, para rodar a aplicação em seu ambiente local.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

```
anna-bella-agency/
│
├── imagens/                # Imagens e arquivos estáticos
│   ├── logo.png            # Logo da agência
│   └── landing-page.png    # Imagem de fundo da landing page
│
├── index.css               # Estilos CSS principais
├── index.html              # Página principal
├── index.js                # Lógica de interação e envio do formulário
│
└── README.md               # Este arquivo
```

## Tecnologias Usadas

- **HTML5**: Estrutura da página, sem o uso de frameworks.
- **CSS3**: Estilização da página, com foco em design responsivo e acessível.
- **JavaScript**: Lógica de interação da página e envio do formulário via **EmailJS**.
- **EmailJS**: Serviço utilizado para enviar os dados do formulário diretamente para o e-mail da agência.

## Como Integrar o EmailJS com o Seu Formulário

Aqui está um guia básico para implementar o **EmailJS** em seu projeto de landing page:

### Passo 1: Criar uma Conta no EmailJS

1. Acesse [EmailJS](https://www.emailjs.com/).
2. Crie uma conta e faça login.
3. No painel, crie um novo serviço de e-mail (por exemplo, Gmail, Outlook, etc.).
4. Crie um novo modelo de e-mail. O modelo define como os dados do formulário serão organizados no e-mail.
5. Obtenha suas **chaves de API** (`public_key` e `service_id`), que são usadas para autenticar as requisições da sua aplicação.

### Passo 2: Configurar a Chave de API no JavaScript

1. No seu arquivo `email.js`, inicialize o **EmailJS** com a sua chave pública (obtida no painel do EmailJS) e configure o formulário para enviar os dados:

```javascript
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
```

2. **Substitua** `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID` e `YOUR_TEMPLATE_ID` pelos valores obtidos ao configurar o serviço e o modelo no painel do EmailJS.

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Email**: contato@annabellaagency.com
- **Website**: [www.annabellaagency.com](http://www.annabellaagency.com)
