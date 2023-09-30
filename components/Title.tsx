import { Center } from '@mantine/core';
import { YEAR } from '~/lib/config';
import classes from './Title.module.css';

export function Title() {
  return (
    <Center component="h1" className={classes.root}>
      <svg
        className={classes.logo}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.6 13H18V26H26L23.6 13Z" fill="#e73145" />
        <rect x="14" y="13" width="4" height="13" fill="#fcd116" />
        <path d="M8.4 13H14V26H6L8.4 13Z" fill="#2659bc" />
        <path
          d="M12 8C12 9.06087 12.4214 10.0783 13.1716 10.8284C13.9217 11.5786 14.9391 12 16 12C17.0609 12 18.0783 11.5786 18.8284 10.8284C19.5786 10.0783 20 9.06087 20 8C20 6.93913 19.5786 5.92172 18.8284 5.17157C18.0783 4.42143 17.0609 4 16 4C14.9391 4 13.9217 4.42143 13.1716 5.17157C12.4214 5.92172 12 6.93913 12 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.11333 12H22.8867C23.1989 12 23.5013 12.1095 23.7411 12.3095C23.9808 12.5096 24.1428 12.7875 24.1987 13.0947L26.3813 25.0947C26.4163 25.2868 26.4086 25.4843 26.3588 25.6732C26.309 25.8621 26.2183 26.0377 26.0932 26.1877C25.968 26.3376 25.8115 26.4583 25.6345 26.541C25.4576 26.6238 25.2647 26.6667 25.0693 26.6667H6.93067C6.73534 26.6667 6.54239 26.6238 6.36547 26.541C6.18855 26.4583 6.03197 26.3376 5.90681 26.1877C5.78165 26.0377 5.69097 25.8621 5.64118 25.6732C5.59139 25.4843 5.5837 25.2868 5.61867 25.0947L7.80133 13.0947C7.85723 12.7875 8.01917 12.5096 8.25894 12.3095C8.4987 12.1095 8.80107 12 9.11333 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={classes.text}>
        <span className={classes.dynamicText}>Taxe </span>PFA în {YEAR}
      </span>
    </Center>
  );
}
