import { YEAR } from '~/lib/config';
import classes from './Title.module.css';

export function Title() {
  return (
    <h1 className={classes.root}>
      <svg className={classes.logo} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill="#CE1126" d="M17.5 10H14v9h5l-1.5-9Z" />
        <path fill="#FCD116" d="M10 10h4v9h-4z" />
        <path fill="#002B7F" d="M6.5 10H10v9H5l1.5-9Z" />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.172 3.172a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656ZM12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M6.835 8a2 2 0 0 0-1.968 1.642l-1.637 9A2 2 0 0 0 5.198 21h13.604M6.835 8h10.33a2 2 0 0 1 1.968 1.642l1.637 9A1.999 1.999 0 0 1 18.802 21M6.835 10l-1.637 9h13.604l-1.637-9H6.835Z"
          clipRule="evenodd"
        />
      </svg>
      <span className={classes.text}>
        <span className={classes.dynamicText}>Taxe </span>PFA<span className={classes.dynamicText}> în</span> {YEAR}
      </span>
    </h1>
  );
}
