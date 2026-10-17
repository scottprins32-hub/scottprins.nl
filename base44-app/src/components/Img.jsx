/** <Image> uit Astro: srcset, sizes en vaste afmetingen tegen verspringen. */
import { imageSet } from '@/lib/images';

export default function Img({ name, alt, sizes, loading = 'lazy', className, ...rest }) {
  const { src, srcSet, width, height } = imageSet(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
