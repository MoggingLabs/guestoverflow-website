// Generates db/seeds/outreach-templates.sql — starter outreach email templates
// (European Portuguese, formal "você") for each active industry × use case.
//
//   node scripts/seed-outreach-templates.mjs   # (re)writes the .sql seed
//
// The .sql is idempotent (insert-if-name-absent), so applying it to a stack's
// outreach_templates table is safe to repeat. Templates are DRAFTS only —
// nothing is ever sent until a campaign is built, given recipients, activated,
// and the worker reaches a due message. Merge fields: {{firstName}}, {{business}}.
//
// Copy is grounded in the live site's positioning. Honesty guardrails: no
// fabricated customers/case studies (none are public yet) — proof leans on the
// real founder origin story + the "parceiro fundador" launch offer; TheFork is
// only named as a channel (its comparison page is legally stashed).
import { writeFile } from "node:fs/promises";

/** Static text → simple email HTML (paragraph per blank line, <br/> within). */
function textToHtml(text) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}

const SIGN = "Com os melhores cumprimentos,\n[O seu nome] · Guest Overflow";
const SIGN_SHORT = "[O seu nome] · Guest Overflow";

const templates = [
  // ───────────────────────── Restaurantes ─────────────────────────
  {
    name: "Restaurantes · 1. Apresentação (sem comissões)",
    subject: "Reservas para o {{business}} sem comissões",
    text: `Olá {{firstName}},

Reparei que o {{business}} recebe reservas — provavelmente por telefone, Instagram ou através de plataformas como o TheFork.

A Guest Overflow dá ao {{business}} a sua própria página de reservas, com a sua marca: os clientes reservam online, sem comissão por reserva e sem intermediários. Os contactos e as preferências ficam seus, não da plataforma.

Preço fixo mensal, e tratamos nós da configuração e da migração — não precisa de fazer nada.

Faria sentido mostrar-lhe numa demonstração de 20 minutos, sem compromisso?

${SIGN}`,
  },
  {
    name: "Restaurantes · 2. Seguimento (faltas / no-shows)",
    subject: "Re: Reservas para o {{business}}",
    text: `Olá {{firstName}},

Fica só o seguimento da minha mensagem.

Um ponto que costuma pesar nos restaurantes são as faltas — sobretudo as mesas grandes ao fim de semana. Com a Guest Overflow pode pedir um pequeno sinal na reserva (MB WAY, Multibanco ou cartão, na sua própria conta Stripe), o que reduz bastante os no-shows — e sem comissões à mistura.

Bastam 20 minutos para lhe mostrar como ficaria para o {{business}}. Quando lhe dá jeito esta semana?

${SIGN_SHORT}`,
  },
  {
    name: "Restaurantes · 3. Prova (parceiro fundador)",
    subject: "Deixo o {{business}} a funcionar — sem trabalho seu",
    text: `Olá {{firstName}},

Uma palavra sobre quem somos: passámos anos a construir sites de alta conversão para negócios locais, e quase todas as conversas terminavam na mesma pergunta — "a reserva pode ficar com a minha marca?". O Guest Overflow é essa resposta.

Estamos a começar de propósito com um grupo pequeno de parceiros fundadores, para acompanhar cada restaurante de perto — com três meses a metade do preço.

Da sua parte é simples: tratamos da configuração e da migração. Posso mostrar-lhe o resultado para o {{business}} numa demonstração de 20 minutos?

${SIGN_SHORT}`,
  },
  {
    name: "Restaurantes · 4. Último contacto",
    subject: "Fecho o assunto, {{firstName}}?",
    text: `Olá {{firstName}},

Não quero estar a insistir. Se ter as reservas com a marca do {{business}} e sem comissões não for prioridade agora, não há problema nenhum e fico por aqui.

Se preferir, deixo o convite em aberto para ver uma demonstração quando quiser — sem compromisso.

Obrigado pelo tempo,
${SIGN_SHORT}`,
  },
  {
    name: "Restaurantes · 5. Migração do Quandoo (gratuita)",
    subject: "O Quandoo vai fechar — e as reservas do {{business}}?",
    text: `Olá {{firstName}},

Se o {{business}} recebe reservas pelo Quandoo, vale a pena saber: o Quandoo está a encerrar e deixa de aceitar novas reservas já em setembro de 2026.

Antes do prazo, podemos migrar gratuitamente a sua lista de clientes e o histórico de reservas para uma página de reservas que é sua — com a sua marca, sem comissão, nunca. Fica com todos os contactos; não perde ninguém.

Quer que tratemos da migração do {{business}}? Bastam 20 minutos para começar.

${SIGN_SHORT}`,
  },

  // ─────────────────────────── Hotéis ───────────────────────────
  {
    name: "Hotéis · 1. Apresentação (reservas diretas)",
    subject: "Reservas diretas para o {{business}}, sem comissões",
    text: `Olá {{firstName}},

A maior parte das reservas de hotéis e hostels como o {{business}} acaba por passar pela Booking.com ou Expedia — e com elas 15% a 18% de comissão em cada estadia.

A Guest Overflow dá ao {{business}} uma página de reservas diretas, com a sua marca: o hóspede reserva no seu próprio site, sem comissão por reserva, e os dados do hóspede ficam seus.

Preço fixo mensal e a configuração tratada por nós.

Mostro-lhe numa demonstração de 20 minutos, sem compromisso?

${SIGN}`,
  },
  {
    name: "Hotéis · 2. Seguimento (comissões Booking/Expedia)",
    subject: "Re: Reservas diretas para o {{business}}",
    text: `Olá {{firstName}},

Só a recuperar a minha mensagem anterior.

Uma conta rápida: por cada 10.000€ de reservas que passam pela Booking, cerca de 1.500€ a 1.800€ ficam em comissões. As reservas diretas no site do {{business}} eliminam essa fatia — e o cliente passa a ser seu, não da plataforma. Em Portugal, por lei, pode até definir a sua tarifa direta abaixo da da OTA.

São 20 minutos para lhe mostrar como ficaria. Tem disponibilidade esta semana?

${SIGN_SHORT}`,
  },
  {
    name: "Hotéis · 3. Prova (parceiro fundador)",
    subject: "Página de reservas do {{business}} pronta sem trabalho seu",
    text: `Olá {{firstName}},

Uma nota sobre quem somos: viemos de anos a construir sites de alta conversão para negócios locais, e o Guest Overflow é o que esses clientes nos pediam — reservas com a sua própria marca.

Estamos a começar com um grupo pequeno de parceiros fundadores, acompanhados de perto e com três meses a metade do preço. A parte difícil é nossa: montamos a página do {{business}}, ligamos os pagamentos e deixamos as reservas diretas a funcionar em poucos dias.

Posso mostrar-lhe o resultado numa demonstração de 20 minutos?

${SIGN_SHORT}`,
  },
  {
    name: "Hotéis · 4. Último contacto",
    subject: "Fecho o assunto, {{firstName}}?",
    text: `Olá {{firstName}},

Última mensagem da minha parte. Se reduzir as comissões da Booking e ter reservas diretas com a marca do {{business}} não for prioridade agora, sem problema nenhum.

Fica o convite em aberto para uma demonstração quando fizer sentido.

Obrigado pelo tempo,
${SIGN_SHORT}`,
  },

  // ──────────────────── Salões & Barbearias ────────────────────
  {
    name: "Salões & Barbearias · 1. Apresentação (sem comissões)",
    subject: "Marcações online para o {{business}}, sem comissões",
    text: `Olá {{firstName}},

Muitos salões e barbearias como o {{business}} ainda recebem marcações por telefone ou por DM no Instagram — dá trabalho e perdem-se marcações.

A Guest Overflow dá ao {{business}} uma página de marcações com a sua marca: os clientes marcam online a qualquer hora, sem comissão por marcação e sem os extras pagos de plataformas como a Fresha ou a Booksy.

Preço fixo e a configuração tratada por nós.

Mostro-lhe numa demonstração de 20 minutos, sem compromisso?

${SIGN}`,
  },
  {
    name: "Salões & Barbearias · 2. Seguimento (faltas / no-shows)",
    subject: "Re: Marcações online para o {{business}}",
    text: `Olá {{firstName}},

Só a dar seguimento à minha mensagem.

As faltas deixam a cadeira vazia em horários de pico — tempo que não se vende duas vezes. Com a Guest Overflow pode pedir um sinal na marcação (MB WAY, Multibanco ou cartão, na sua conta Stripe) — menos faltas, e sem comissões à mistura.

São 20 minutos para lhe mostrar como ficaria para o {{business}}. Quando lhe dá jeito?

${SIGN_SHORT}`,
  },
  {
    name: "Salões & Barbearias · 3. Prova (parceiro fundador)",
    subject: "Deixo o {{business}} a receber marcações online sem trabalho seu",
    text: `Olá {{firstName}},

Sobre quem somos: passámos anos a fazer sites de alta conversão para negócios locais, e o Guest Overflow nasceu do que esses clientes pediam — marcações com a sua marca, sem comissões.

Estamos a começar com um grupo pequeno de parceiros fundadores, com três meses a metade do preço e acompanhamento próximo. Do seu lado é simples: montamos a página do {{business}}, com os seus serviços e horários, e deixamos as marcações a funcionar.

Posso mostrar-lhe o resultado numa demonstração de 20 minutos?

${SIGN_SHORT}`,
  },
  {
    name: "Salões & Barbearias · 4. Último contacto",
    subject: "Fecho o assunto, {{firstName}}?",
    text: `Olá {{firstName}},

Não quero insistir. Se ter marcações online com a marca do {{business}} e sem comissões não for prioridade agora, sem problema.

Deixo o convite para uma demonstração quando quiser, sem compromisso.

Obrigado,
${SIGN_SHORT}`,
  },
];

const sqlStr = (s) => `'${s.replace(/'/g, "''")}'`;

const header = `-- Starter outreach email templates (PT-PT) for each active industry × use case.
-- Generated by scripts/seed-outreach-templates.mjs — edit there and regenerate.
-- Idempotent: inserts a template only if its name is not already present.
-- Drafts only: nothing sends until a campaign is built, given recipients, and
-- activated. Merge fields: {{firstName}}, {{business}}.
`;

const body = templates
  .map((t) => {
    const html = textToHtml(t.text);
    return `insert into outreach_templates (name, subject, body_html, body_text)
select ${sqlStr(t.name)}, ${sqlStr(t.subject)}, ${sqlStr(html)}, ${sqlStr(t.text)}
where not exists (select 1 from outreach_templates where name = ${sqlStr(t.name)});`;
  })
  .join("\n\n");

await writeFile(
  new URL("../db/seeds/outreach-templates.sql", import.meta.url),
  `${header}\n${body}\n`,
  "utf8",
);
console.log(`wrote db/seeds/outreach-templates.sql (${templates.length} templates)`);
