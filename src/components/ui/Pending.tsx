/** Visible stand-in for details the restaurant hasn't supplied yet — never invented data. */
export function Pending({ children }: { children: React.ReactNode }) {
  return <span className="italic opacity-55">[ {children} ]</span>;
}
