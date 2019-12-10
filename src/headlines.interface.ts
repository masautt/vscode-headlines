export interface HeadlinesInfo {
    articles: [
        {
            source : {
                name: string
            },
            title: string,
            url: string
        }
    ];
}