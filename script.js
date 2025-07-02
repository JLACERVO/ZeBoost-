
document.getElementById("pedidoForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const servico = document.getElementById("servico").selectedOptions[0].text;
  const quantidade = document.getElementById("quantidade").value;
  const link = document.getElementById("link").value;
  const mensagem = document.getElementById("mensagem");

  const valor = {
    "130": 39.00,
    "127": 30.60,
    "24": 4.40,
    "23": 4.50,
    "2": 0.48
  }[document.getElementById("servico").value] || 1.00;

  const total = ((quantidade / 1000) * valor).toFixed(2);

  const resposta = await fetch("https://api.paggue.io/checkout/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "client_key": "0454451549397705112",
      "client_secret": "0897351410391611072"
    },
    body: JSON.stringify({
      company_id: "173062",
      description: `Pedido Zé Boost - ${servico}`,
      customer: {
        name: nome,
        email: email
      },
      amount: parseFloat(total),
      currency: "BRL",
      expires_in: 3600,
      metadata: {
        link_instagram: link,
        quantidade: quantidade
      }
    })
  });

  const dados = await resposta.json();
  if (dados.url) {
    mensagem.innerHTML = "✅ Redirecionando para pagamento seguro...";
    window.location.href = dados.url;
  } else {
    mensagem.innerHTML = "❌ Erro ao gerar pagamento. Tente novamente.";
  }
});
