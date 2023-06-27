import { PropsWithChildren } from "react";

export function Content({ children }: PropsWithChildren) {
  return <div className="grow">{children}</div>;
}
