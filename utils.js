export function getSqlBytesForHexadecimalString(input) {
  return `\\x${input.substring(2)}`;
}
export default getSqlBytesForHexadecimalString;
