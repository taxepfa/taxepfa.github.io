import { Select as MantineSelect } from '@mantine/core';
import classes from './Select.module.css';

export type SelectProps = {
  ariaLabel: string;
  withDescriptionSpace?: boolean;
  data: (string | { value: string; label: string })[];
  value: string;
  onChange: (val: string) => void;
};

export function Select({ ariaLabel, withDescriptionSpace, data, value, onChange }: SelectProps) {
  return (
    <MantineSelect
      classNames={{ label: classes.label, description: classes.description }}
      aria-label={ariaLabel}
      label=" "
      description={withDescriptionSpace ? '\u00A0' : undefined}
      checkIconPosition="right"
      allowDeselect={false}
      data={data}
      value={value}
      onChange={onChange}
    />
  );
}
