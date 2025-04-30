export default function LayoutWithNavFooter({
    children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <div>
            {children}
        </div>
    );
}