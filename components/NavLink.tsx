'use client';

import { Box } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './NavLink.module.css';

export type NavLinkProps = {
  className: string;
  textClassName: string;
  href: string;
  icon: React.ReactNode;
  text: string;
};

export function NavLink({ className, textClassName, href, icon, text }: NavLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <Box
        component="a"
        className={clsx(
          classes.root,
          {
            [classes.current]: href === usePathname(),
          },
          className
        )}
      >
        {icon}
        <div className={textClassName}>{text}</div>
      </Box>
    </Link>
  );
}
