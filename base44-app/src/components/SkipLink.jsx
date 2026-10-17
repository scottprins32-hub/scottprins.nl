import { useT } from '@/lib/locale';

/** Eerste tab op elke pagina: meteen naar de inhoud. */
export default function SkipLink() {
  const { nav } = useT();
  return (
    <a href="#main" className="skip-link btn btn-signal">
      {nav.skip}
    </a>
  );
}
