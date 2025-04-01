type FeatureItemProps = {
    icon: string;
    title: string;
    description: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
    icon,
    title,
    description,
}) => (
    <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
            <h3 className="font-medium text-white">{title}</h3>
            <p className="text-white/80">{description}</p>
        </div>
    </div>
);

export default FeatureItem;
