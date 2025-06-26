export function generateHash(data: string): string {
  return new Bun.CryptoHasher("sha3-256").update(data).digest("hex");
}