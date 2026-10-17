/**
 * Vragen, als native <details>: werkt met elk hulpmiddel. Openklappen
 * beweegt waar de browser dat kan (interpolate-size), anders gaat het gewoon
 * meteen open. Onderaan de weg voor wie zijn vraag niet terugziet: WhatsApp,
 * met een bericht klaar.
 */
import { waHref } from '@/lib/whatsapp';
import { useT } from '@/lib/locale';
import Icon from './Icon';
import './Faq.css';

export default function Faq() {
  const { faq, whatsapp } = useT();
  return (
    <section className="faq section-pad" id="vragen" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <p className="label faq-label">{faq.label}</p>
          <h2 id="faq-title" className="display faq-title" data-reveal="title">
            {faq.title}
          </h2>
        </div>
        <div className="faq-list">
          {faq.items.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>
                <span>{item.q}</span>
                <Icon name="plus" className="icon faq-icon" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
          <div className="faq-more">
            <p>
              <strong>{faq.moreTitle}</strong>
              {faq.moreText}
            </p>
            <a className="btn btn-ghost" href={waHref(whatsapp.generic)} data-wa={whatsapp.named} target="_blank" rel="noopener">
              <Icon name="whatsapp" />
              {faq.moreCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
