"use server";

const handleSave = async (data: FormData) => {
  console.log(data);

  const placa = data.get("placa");
  const tipoPlaca = data.get("tipoPlaca");
  const motorista = data.get("motorista");
  const pesoSaida = data.get("pesoSaida");
  const pesoEntrada = data.get("pesoEntrada");
  const nf = data.get("nf");

  
  const r = { status: 201 };

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave };
