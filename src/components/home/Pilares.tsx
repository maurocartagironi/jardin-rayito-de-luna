import { useContent } from '@/context/ContentContext';
import Loading from '@components/Loading';
import { label } from '@/labels/labels';

export const Pilares: React.FC = () => {
    const { content, isLoading, hasError } = useContent();
    const info: Content[] = content.filter((item) => item.type === 'pillars');

    return (
        <>
            {!hasError && (
                <section className="bg-muted py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-semibold text-center mb-10">
                            {label.pillars.title}
                        </h2>
                        {info && !isLoading ? (
                            <div className="grid md:grid-cols-3 gap-6">
                                {info.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-6 bg-white rounded-2xl shadow flex items-center gap-4"
                                    >
                                        <div className="text-2xl">
                                            {item.emoji}
                                        </div>
                                        <p className="text-lg font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Loading isDot={true} color="bg-[#bebebe]" />
                        )}
                    </div>
                </section>
            )}
        </>
    );
};
