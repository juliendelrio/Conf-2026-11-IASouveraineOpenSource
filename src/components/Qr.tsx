import QRCode from 'qrcode';

/** The QR code of a URL as SVG, computed locally (no network), so the room can open the address. */
export const Qr: React.FC<{ url: string; size: number }> = ({ url, size }) => {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const cells = modules.size;
  const dark: { x: number; y: number }[] = [];
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) if (modules.get(y, x)) dark.push({ x, y });
  return (
    <svg viewBox={`-2 -2 ${cells + 4} ${cells + 4}`} width={size} height={size} shapeRendering="crispEdges">
      <rect x={-2} y={-2} width={cells + 4} height={cells + 4} style={{ fill: '#ffffff' }} />
      {dark.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} style={{ fill: '#000000' }} />
      ))}
    </svg>
  );
};
