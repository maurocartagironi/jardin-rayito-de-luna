import { useContent } from '@/context/ContentContext';
import { label } from '@/labels/labels';
import Card from '@components/Card';
import Loading from '@components/Loading';

export const Actividades: React.FC = () => {
    const { content, isLoading, hasError } = useContent();
    const info: Content[] = content.filter(
        (item) => item.type === 'activities'
    );

    return (
        <>
            {!hasError && (
                <section className="max-w-6xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-semibold text-center mb-8">
                        {label.activities.title}
                    </h2>
                    {info && !isLoading ? (
                        <div className="grid md:grid-cols-4 gap-4">
                            {info.map((actividad, i) => (
                                <Card
                                    key={i}
                                    title={actividad.title}
                                    description={actividad.description}
                                    iconUrl={actividad.icon}
                                    hasTranslate={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loading isDot={true} color="bg-[#bebebe]" />
                    )}
                </section>
            )}
        </>
    );
};
