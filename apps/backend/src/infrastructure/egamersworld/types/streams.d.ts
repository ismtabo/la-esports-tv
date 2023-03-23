// Generated by https://quicktype.io

export interface Streams {
    list:           Stream[];
    game:           Game;
    seo:            SEO;
    jsonBreadcrumb: JSONBreadcrumb[];
    count:          number;
}

export interface Game {
    _id:  string;
    name: string;
    slug: GameSlug;
}

export enum GameSlug {
    Counterstrike = "counterstrike",
}

export interface JSONBreadcrumb {
    link:  string;
    ankor: string;
}

export interface Stream {
    _id:                    string;
    game_slug:              GameSlug;
    status:                 Status;
    vod:                    string;
    start_date:             string;
    home_team_name:         string;
    home_team_country_code: string;
    away_team_name:         string;
    away_team_country_code: string;
    stream_source:          StreamSource;
    tournament_id:          string;
    tournament:             string;
    slug:                   string;
    image:                  string;
    streams:                string[];
    stream_name:            string;
    thumb:                  string;
}

export enum Status {
    Upcoming = "upcoming",
}

export enum StreamSource {
    Twitch = "twitch",
}

export interface SEO {
    _id:            string;
    __v:            number;
    breadcrumb:     string;
    breadcrumb2:    string;
    content:        string;
    createdAt:      string;
    description:    string;
    faq:            any[];
    h1:             string;
    is_template:    boolean;
    json_content:   JSONContent;
    lang:           string;
    linkTags:       LinkTag[];
    metaTags:       MetaTag[];
    navigation:     string;
    site:           string;
    slug:           string;
    title:          string;
    updatedAt:      string;
    image:          string;
    url:            string;
    jsonBreadcrumb: JSONBreadcrumb[];
}

export interface JSONContent {
    en_GB: string;
    ru:    string;
    de:    string;
    pt:    string;
    es:    string;
    pl:    string;
    fr:    string;
    tr:    string;
    fi:    string;
    da:    string;
    no:    string;
    sv:    string;
}

export interface LinkTag {
    property:  Property;
    href:      string;
    hreflang?: string;
}

export enum Property {
    Alternate = "alternate",
    Canonical = "canonical",
}

export interface MetaTag {
    property:  string;
    content:   string;
    noEscape?: boolean;
}