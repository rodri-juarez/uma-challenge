export interface GetMonthQueryResponse {
  data: {
    month: Month
  }
}

interface Month {
  days: CalendarDay[]
}

export interface CalendarDay {
  date: string;
  title: string;
  description: string;
  mediaType: string;
  imgUrl: string;
  imgUrlHD: string;
  thumbnailUrl: string;
  comments: string[];
}
