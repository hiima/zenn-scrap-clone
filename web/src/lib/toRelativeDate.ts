import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const A_MINUTE = 60;
const AN_HOUR = A_MINUTE * 60;
const A_DAY = AN_HOUR * 24;
const A_MONTH = A_DAY * 31;
const A_YEAR = A_MONTH * 12;

/**
 * 相対日時を返す
 * @param src 元の日時
 * @returns 相対日時
 */
export const toRelativeDate = (src: string) => {
  // FIXME: APIから返ってきた値の時点でDate型になっていてほしい
  const date = dayjs(src, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  if (!date.isValid) {
    return src;
  }

  const now = dayjs();
  const diff = now.diff(date, "seconds");

  // 現在日時と比較して
  if (diff < A_MINUTE) {
    // 1分以内ならx秒前
    return `${Math.trunc(diff)}秒前`;
  } else if (diff < AN_HOUR) {
    // 1時間以内ならx分前
    return `${Math.trunc(diff / A_MINUTE)}分前`;
  } else if (diff < A_DAY) {
    // 1日以内ならx時間前
    return `${Math.trunc(diff / AN_HOUR)}時間前`;
  } else if (diff < A_MONTH) {
    // 1ヶ月以内ならx日前
    return `${Math.trunc(diff / A_DAY)}日前`;
  } else if (diff < A_YEAR) {
    // 1年以内ならxヶ月前
    return `${Math.trunc(diff / A_MONTH)}ヶ月前`;
  } else {
    // それ以外ならx年前
    return `${Math.trunc(diff / A_YEAR)}年前`;
  }
};
