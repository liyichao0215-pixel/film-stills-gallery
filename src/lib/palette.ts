import sharp from 'sharp';

/** Sample the image, then use Sharp's palette quantizer to find its dominant colors. */
export async function photoPalette(input: string | Buffer): Promise<string[]> {
  const quantized = await sharp(input)
    .rotate()
    .resize(80, 80, { fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#f7f4eb' })
    .toColourspace('srgb')
    .png({ palette: true, colours: 5, dither: 0 })
    .toBuffer();

  const pixels = await sharp(quantized).toColourspace('srgb').removeAlpha().raw().toBuffer();
  const counts = new Map<string, number>();
  for (let i = 0; i < pixels.length; i += 3) {
    const hex = '#' + pixels.toString('hex', i, i + 3).toUpperCase();
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([hex]) => hex);
}
