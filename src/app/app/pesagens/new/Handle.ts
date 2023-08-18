"use server";

const handleSave = async (data: FormData) => {
  const placa = data.get("placa");
  const tipoPlaca = data.get("tipoPlaca");
  const motorista = data.get("motorista");
  const pesoSaida = data.get("pesoSaida");
  const pesoEntrada = data.get("pesoEntrada");
};

export { handleSave };
