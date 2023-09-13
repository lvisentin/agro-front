export interface PrimaryButtonProps {
    disabled?: boolean;
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
    type: 'button' | 'submit';
}