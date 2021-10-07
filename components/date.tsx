import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date: Date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
