"use server";

const handleSave = async (data: FormData) => {
  const url = "http://localhost:3010/transportadoras";
  const body = {
    dataDeRegistro: data.get("dataDeRegisto"),
    nome: data.get("nome"),
    nomeFantasia: data.get("nomeFantasia"),
    tipoPessoa: data.get("tipoPessoa"),
    doc: data.get("doc"),
    inscricaoEstadual: data.get("inscricaoEstadual"),
    cep: data.get("cep"),
    logradouro: data.get("logaduro"),
    numero: data.get("numero"),
    bairro: data.get("bairro"),
    cidade: data.get("cidade"),
    uf: data.get("uf"),
    telefone1: data.get("telefone1"),
    telefone2: data.get("telefone2"),
    email: data.get("email"),
    observacao: data.get("observacao"),
  };

  fetch(url, {
    method: "post",
    body: JSON.stringify(body),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { handleSave };
