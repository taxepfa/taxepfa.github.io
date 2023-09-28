import classes from './Page.module.css';

export function Page({ children }: React.PropsWithChildren) {
  return <div className={classes.root}>{children}</div>;
}
