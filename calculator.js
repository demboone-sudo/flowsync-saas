/**
 * FlowSync.ai - Módulo da Calculadora de ROI
 * Responsabilidade: Gerenciar sliders e recalcular horas e valores em tempo real.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controles deslizantes (Inputs Range)
  const hoursSlider = document.getElementById('hours-slider');
  const teamSlider = document.getElementById('team-slider');
  const rateSlider = document.getElementById('rate-slider');

  // 2. Rótulos visuais dos controles
  const hoursVal = document.getElementById('hours-val');
  const teamVal = document.getElementById('team-val');
  const rateVal = document.getElementById('rate-val');

  // 3. Indicadores de resultado
  const resHours = document.getElementById('res-hours');
  const resSavings = document.getElementById('res-savings');

  // Validação preventiva: encerra com aviso se os elementos não existirem na página
  if (!hoursSlider || !teamSlider || !rateSlider || !resHours || !resSavings) {
    console.warn('Módulo Calculadora: Elementos necessários não foram localizados no DOM.');
    return;
  }

  // Constantes de negócio da simulação
  const EFFICIENCY_FACTOR = 0.70; // 70% de tarefas manuais otimizadas
  const WEEKS_PER_YEAR = 52;

  function calculateROI() {
    const hours = parseFloat(hoursSlider.value) || 0;
    const team = parseFloat(teamSlider.value) || 0;
    const rate = parseFloat(rateSlider.value) || 0;

    // Atualiza os rótulos ao lado dos controles
    if (hoursVal) hoursVal.textContent = `${hours} h`;
    if (teamVal) teamVal.textContent = `${team} ${team === 1 ? 'pessoa' : 'pessoas'}`;
    if (rateVal) rateVal.textContent = `R$ ${rate} /h`;

    // Fórmulas de economia anual
    const totalHoursSaved = Math.round(hours * team * EFFICIENCY_FACTOR * WEEKS_PER_YEAR);
    const totalSavingsMoney = totalHoursSaved * rate;

    // Renderiza nos cards com formatação brasileira
    resHours.textContent = `${totalHoursSaved.toLocaleString('pt-BR')} horas`;
    resSavings.textContent = totalSavingsMoney.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // Escuta os eventos 'input' para feedback instantâneo ao arrastar
  [hoursSlider, teamSlider, rateSlider].forEach(slider => {
    slider.addEventListener('input', calculateROI);
  });

  // Executa uma vez no carregamento para exibir os valores padrão
  calculateROI();
});