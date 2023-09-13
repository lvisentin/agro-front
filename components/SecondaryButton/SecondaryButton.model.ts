export interface SecondaryButtonProps {
  disabled?: boolean;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  type: "button" | "submit";
}
