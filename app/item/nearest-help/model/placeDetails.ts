// Generated by https://quicktype.io

export interface PlaceDetails {
    html_attributions?: any[];
    result?:            Result;
    status?:            string;
}

export interface Result {
    address_components?:         AddressComponent[];
    adr_address?:                string;
    formatted_address?:          string;
    formatted_phone_number?:     string;
    geometry?:                   Geometry;
    icon?:                       string;
    id:                         string;
    international_phone_number?: string;
    name:                       string;
    opening_hours?:              OpeningHours;
    photos?:                     Photo[];
    place_id?:                   string;
    plus_code?:                  PlusCode;
    rating?:                     number;
    reference?:                  string;
    reviews?:                    Review[];
    scope?:                      string;
    types?:                      string[];
    url?:                        string;
    utc_offset?:                 number;
    vicinity?:                   string;
    website?:                    string;
}

export interface AddressComponent {
    long_name?:  string;
    short_name?: string;
    types?:      string[];
}

export interface Geometry {
    location?: Location;
    viewport?: Viewport;
}

export interface Location {
    lat?: number;
    lng?: number;
}

export interface Viewport {
    northeast?: Location;
    southwest?: Location;
}

export interface OpeningHours {
    open_now?:     boolean;
    periods?:      Period[];
    weekday_text?: string[];
}

export interface Period {
    open?: Open;
}

export interface Open {
    day?:  number;
    time?: string;
}

export interface Photo {
    height:            number;
    html_attributions: string[];
    photo_reference:   string;
    width:             number;
}

export interface PlusCode {
    compound_code?: string;
    global_code?:   string;
}

export interface Review {
    author_name?:               string;
    author_url?:                string;
    language?:                  string;
    profile_photo_url?:         string;
    rating?:                    number;
    relative_time_description?: string;
    text?:                      string;
    time?:                      number;
}
