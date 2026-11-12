function processarTransacaoPix(chavePix, valor, callbackAcao) {
    if (valor <= 0) {
        console.log("Erro: o valor deve ser maior que zero!");
        return;
    }

    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix,
        valor,
        data: new Date().toLocaleTimeString()
    };

    console.log("\nPagamento PIX processado!");
    console.log("ID: " + transacao.id);
    console.log("Valor: R$ " + transacao.valor.toFixed(2));

    callbackAcao(transacao);
}

function emitirComprovantePorEmail(transacao) {
    const { id, chavePix, valor } = transacao;

    console.log("\n--- COMPROVANTE ---");
    console.log("ID: " + id);
    console.log("Destinatario: " + chavePix);
    console.log("Valor: R$ " + valor.toFixed(2));
    console.log("Comprovante enviado com sucesso!");
}



function creditarCashback(transacao) {
    const { valor } = transacao;
    const cashback = valor * 0.02;

    console.log("\n--- CASHBACK ---");
    console.log("Cashback: R$ " + cashback.toFixed(2));
}


function auditarTransacaoSuspeita(transacao) {
    const { id, valor } = transacao;

    console.log("\n--- AUDITORIA ---");

    if (valor > 5000) {
        console.log("ALERTA: Transacao " + id + " suspeita!");
        console.log("Encaminhada para analise antifraude.");
    } else {
        console.log("Transacao aprovada na auditoria!");
    }
}


console.log("\n===== TESTE 1: COMPROVANTE =====");

processarTransacaoPix(
    "cliente@email.com",
    150,
    emitirComprovantePorEmail
);

console.log("\n===== TESTE 2: CASHBACK =====");

processarTransacaoPix(
    "cliente@pix.com",
    200,
    creditarCashback
);

console.log("\n===== TESTE 3: AUDITORIA =====");

processarTransacaoPix(
    "cliente@banco.com",
    6000,
    auditarTransacaoSuspeita
);

console.log("\n===== TESTE 4: ARROW FUNCTION =====");

processarTransacaoPix(
    "cliente@pix.com",
    100,
    (transacao) => {
        const desconto = 5;
        const valorFinal = Math.max(0, transacao.valor - desconto);

        console.log("\n--- DESCONTO ---");
        console.log("Desconto: R$ " + desconto.toFixed(2));
        console.log("Valor com desconto: R$ " + valorFinal.toFixed(2));
    }
);


function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
    console.log("\nWebhook agendado!");
    console.log("Horario: " + new Date().toLocaleTimeString());

    setTimeout(() => {
        console.log("\nWebhook enviado para a loja!");
        console.log("Horario: " + new Date().toLocaleTimeString());

        callbackFinalizacao(transacao);
    }, 2000);
}


console.log("\n===== TESTE 5: WEBHOOK =====");

processarTransacaoPix(
    "loja@pix.com",
    350,
    (transacao) => {
        enviarWebhookAssincrono(transacao, (dados) => {
            console.log("Transacao " + dados.id + " notificada com sucesso!");
        });
    }
);

console.log("\nO sistema continua executando normalmente!");


console.log("\n===== TESTE 6: VALIDACAO =====");

processarTransacaoPix(
    "cliente@pix.com",
    -50,
    emitirComprovantePorEmail
);
