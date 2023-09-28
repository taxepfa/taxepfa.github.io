import { Select as MantineSelect } from '@mantine/core';
import classes from './Select.module.css';

export type SelectProps = {
  ariaLabel: string;
  data: (string | { value: string; label: string })[];
  value: string;
  onChange: (val: string) => void;
};

export function Select({ ariaLabel, data, value, onChange }: SelectProps) {
  return (
    <MantineSelect
      classNames={{ label: classes.label }}
      aria-label={ariaLabel}
      label=" "
      checkIconPosition="right"
      allowDeselect={false}
      data={data}
      value={value}
      onChange={onChange}
    />
  );
}
