import { useContent } from '@/context/ContentContext';
import Loading from '@components/Loading';

export const Nosotros: React.FC = () => {
    const { content, isLoading, hasError } = useContent();
    const info: Content = content.filter((item) => item.type === 'whoweare')[0];

    if (isLoading) {
        return <Loading isDot={true} color="bg-[#bebebe]" />;
    }

    return (
        <>
            {!hasError && info && (
                <section className="max-w-5xl mx-auto px-4 py-16">
                    <h2 className="text-3xl font-semibold mb-4">
                        {info?.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {info?.description}
                    </p>
                </section>
            )}
        </>
    );
};
