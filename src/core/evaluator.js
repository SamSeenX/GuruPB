/**
 * Interactive Red-Flag Evaluator Module
 * Lightweight Vanilla JS calculator assessing manipulative marketing tactics.
 */

const RISK_TIERS = [
  {
    min: 0,
    max: 0,
    label: 'Awaiting Assessment',
    color: 'var(--text-muted)',
    message: 'Check any of the signals observed in the promotion to calculate an objective manipulation appraisal.'
  },
  {
    min: 1,
    max: 1,
    label: 'Low Structural Concern',
    color: 'var(--accent)',
    message: 'Minimal manipulative patterns detected. Continue to verify instructor credentials and written refund terms.'
  },
  {
    min: 2,
    max: 2,
    label: 'Moderate Marketing Pressure',
    color: 'var(--accent-secondary)',
    message: 'Standard direct-response urgency detected. Watch for artificial countdowns or subsequent micro-upsells.'
  },
  {
    min: 3,
    max: 3,
    label: 'Elevated Funnel Risk',
    color: 'var(--accent-secondary)',
    message: 'Multiple predatory funnel mechanics observed. High likelihood of free sessions pivoting to multi-thousand dollar masterminds.'
  },
  {
    min: 4,
    max: 5,
    label: 'Critical Guru Funnel Pattern',
    color: '#dc2626',
    message: 'Classic four-stage guru architecture identified. High financial risk with systematic liability transfer.'
  }
];

export function initEvaluator() {
  const form = document.getElementById('evaluator-form');
  const resultBox = document.getElementById('eval-result');
  const scoreEl = document.getElementById('eval-score');
  const msgEl = document.getElementById('eval-message');
  const resetBtn = document.getElementById('eval-reset');

  if (!form || !resultBox || !scoreEl || !msgEl) return;

  function recalculate() {
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    let count = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) count++;
    });

    const tier = RISK_TIERS.find((t) => count >= t.min && count <= t.max) || RISK_TIERS[0];

    scoreEl.textContent = `${count} of 5 Flags: ${tier.label}`;
    scoreEl.style.color = tier.color;
    msgEl.textContent = tier.message;
    resultBox.classList.add('is-active');
  }

  form.addEventListener('change', recalculate);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.checked = false;
      });
      scoreEl.textContent = '0 of 5 Flags: Awaiting Assessment';
      scoreEl.style.color = 'var(--text-muted)';
      msgEl.textContent = RISK_TIERS[0].message;
    });
  }
}
