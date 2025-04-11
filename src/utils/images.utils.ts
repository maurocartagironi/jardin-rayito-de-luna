export const icons = import.meta.glob('@/assets/icon/*.svg', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const gallery = import.meta.glob('@/assets/gallery/*', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const news = import.meta.glob('@/assets/news/*', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const image = import.meta.glob('@/assets/img/*', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

export const getImagePath = (filename: string, folder?: string) => {
    const match = Object.entries(
        folder === 'gallery'
            ? gallery
            : folder === 'news'
              ? news
              : folder === 'img'
                ? image
                : icons
    ).find(([key]) =>
        key.endsWith(folder ? `/${folder}/${filename}` : `/icon/${filename}`)
    );
    return match?.[1] || filename;
};
