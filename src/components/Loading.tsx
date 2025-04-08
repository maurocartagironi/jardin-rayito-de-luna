interface LoadingProps {
    isDot?: boolean;
    label?: string | null;
    size?: number;
    color?: string | null;
}

export default function Loading({ isDot, label, size, color }: LoadingProps) {
    return (
        <>
            {isDot ? (
                <div className="flex justify-center items-center h-[300px]">
                    <div className="flex gap-2">
                        <span
                            className={`w-4 h-4 ${color ? color : 'bg-primary'} rounded-full animate-bounce [animation-delay:-0.3s]`}
                        />
                        <span
                            className={`w-4 h-4 ${color ? color : 'bg-primary'} rounded-full animate-bounce [animation-delay:-0.15s]`}
                        />
                        <span
                            className={`w-4 h-4 ${color ? color : 'bg-primary'} rounded-full animate-bounce`}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div
                        className={`${size ? 'w-' + size + ' h-' + size : 'w-10 h-10'} border-8 border-t-transparent border-primary rounded-full animate-spin`}
                    ></div>
                    {label && (
                        <p
                            className={`text-lg font-semibold ${color ? 'text-' + color : 'text-primary'}`}
                        >
                            {label}
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
