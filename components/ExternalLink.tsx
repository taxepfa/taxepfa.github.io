export type ExternalLinkProps = React.PropsWithChildren<{
  to: string;
}>;

export function ExternalLink({ to, children }: ExternalLinkProps) {
  return (
    <a href={to} target="_blank">
      {children}
    </a>
  );
}
