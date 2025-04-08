interface Content {
    title: string;
    description: string;
    image: string;
    index: number;
    emoji: string;
    icon: string;
    type: string;
    button?: {
        label: string;
        position?: 'bottom' | 'center';
        link: string;
    };
}
