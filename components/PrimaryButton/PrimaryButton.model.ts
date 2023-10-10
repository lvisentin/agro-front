export interface PrimaryButtonProps {
  disabled?: boolean;
  className?: string;
  onClick?: (values: any) => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}
