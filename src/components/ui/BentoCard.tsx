import { cn } from "@/lib/utils"

type BentoCardProps = React.ComponentProps<"div">;

export default function BentoCard({
    className,
    children,
    ...props
}: BentoCardProps) {
    return (
        <div
        className={cn("relative overflow-hidden rounded-xl p-4", className)}
        {...props}
    >
        {children}
        </div>
    );
}