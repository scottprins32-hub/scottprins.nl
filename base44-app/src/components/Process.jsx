/**
 * Werkwijze: vijf stappen, met een lijn die meegroeit terwijl je scrolt.
 * Een stap licht op zodra de lijn hem bereikt; zonder motion staan ze
 * allemaal aan.
 */
import { useEffect } from 'react';
import { useT } from '@/lib/locale';
import { initProcess } from '@/scripts/process';
import './Process.css';

export default function Process() {
  const { process } = useT();
  useEffect(() => {
    initProcess();
  }, []);
  return (
    <section className="process section-pad" id="werkwijze" aria-labelledby="process-title">
      <div className="wrap process-grid">
        <div className="process-head">
          <p className="label process-label">{process.label}</p>
          <h2 id="process-title" className="display process-title" data-reveal="title">
            {process.title}
          </h2>
          <p className="process-note" data-reveal="up">
            {process.note}
          </p>
        </div>
        <ol className="process-steps" data-steps="">
          <li className="process-line" aria-hidden="true">
            <span className="process-line-fill" data-line="" />
          </li>
          {process.steps.map((step) => (
            <li className="process-step" data-step="" key={step.title}>
              <span className="process-dot" aria-hidden="true" />
              <p className="process-when">{step.when}</p>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
