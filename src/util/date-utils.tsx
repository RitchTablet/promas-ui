import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export class DateUtils {
    transformDate(date: Date) {
        const postDate = new Date(date);
        const differenceDate = formatDistanceToNow(postDate, { addSuffix: true, locale: es });
        return differenceDate;
    };
}