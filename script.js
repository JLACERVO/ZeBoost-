document.getElementById("pedidoForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  // Pegando os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const servicoSelect = document.getElementById("servico");
  const servicoID = servicoSelect.value;
  const servicoNome = servicoSelect.selectedOptions[0].text;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const link = document.getElementById("link").value.trim();
  const mensagem = document.getElementById("mensagem");

  // Validação básica
  if (!nome || !email || !servicoID || !quantidade || !link) {
    mensagem.innerHTML = "⚠️ Preencha todos os campos obrigatórios.";
    return;
  }

  mensagem.innerHTML = "⏳ Gerando link de pagamento...";

  // Preços por serviço (pode expandir conforme necessário)
  const precos = {
    "130": 39.00,
    "127": 30.60,
    "24": 4.40,
    "23": 4.50,
    "2": 0.48
  };

  const precoUnitario = precos[servicoID] || 1.00;
  const valorTotal = ((quantidade / 1000) * precoUnitario).toFixed(2);

  try {
    const resposta = await fetch("https://api.paggue.io/checkout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client_key": "0454451549397705112",
        "client_secret": "0897351410391611072"
      },
      body: JSON.stringify({
        company_id: "173062",
        description: `Zé Boost - ${servicoNome}`,
        customer: {
          name: nome,
          email: email
        },
        amount: parseFloat(valorTotal),
        currency: "BRL",
        expires_in: 3600,
        metadata: {
          link_instagram: link,
          quantidade: quantidade,
          servico_id: servicoID
        }
      })
    });

    const dados = await resposta.json();

    if (dados.url) {
      mensagem.innerHTML = "✅ Redirecionando para pagamento...";
      setTimeout(() => {
        window.location.href = dados.url;
      }, 1000);
    } else {
      mensagem.innerHTML = "❌ Erro ao gerar pagamento. Tente novamente.";
    }

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    mensagem.innerHTML = "❌ Erro ao conectar com o sistema de pagamento.";
  }
});