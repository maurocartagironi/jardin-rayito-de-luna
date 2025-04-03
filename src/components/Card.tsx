import { FC, ReactNode } from 'react';

interface CardProps {
    title: string;
    description: string;
    image?: string;
    icon?: ReactNode;
    iconUrl?: string;
    hasTranslate?: boolean;
    date: string;
}

const Card: FC<CardProps> = ({
    title,
    description,
    image,
    icon,
    iconUrl,
    hasTranslate = true,
    date,
}) => {
    return (
        <div
            className={`${date ? 'cursor-pointer' : 'cursor-default'} border-2 border-red-300 rounded-2xl shadow-md transition-transform
				bg-white overflow-hidden text-center ${hasTranslate ? 'hover:-translate-y-1' : ''} ${date ? 'max-h-[350px]' : ''}`}
        >
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-2xl mb-5"
                />
            ) : (
                <div
                    className={`w-16 h-16 mx-auto mt-6 mb-4 flex items-center justify-center text-3xl
    ${icon ? 'rounded-full bg-red-100 shadow-inner' : ''}`}
                >
                    {icon ? (
                        icon
                    ) : iconUrl ? (
                        <img
                            src={iconUrl}
                            alt={title}
                            className="w-12 h-12 mx-auto mb-2"
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}
            <div className="px-6 pb-6">
                <div className="text-sm text-primary mb-2 text-left">
                    {date}
                </div>
                <h3
                    className={`text-xl font-semibold mb-2 ${date ? 'text-left truncate' : 'text-red-500'}`}
                >
                    {title}
                </h3>
                <p
                    className={`text-gray-600 leading-relaxed ${date ? 'truncate-2-lines text-md text-left' : 'text-sm'}`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
