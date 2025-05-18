export const formatNumber = (n, format = ",") => {
  if (!n) {
    return n;
  }
  return n
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, format);
};

export const formatAmount = (n) => {
  if (!n) {
    return n;
  }
  return (
    <>
      <div >
        {formatNumber(n, ".")}
        <span style={{ fontSize: 14, marginLeft: 1 }}>₫</span>
      </div>
    </>
  );
};

export const formatDateTime = (datetime, locale="vi") => {
  if (!datetime) {
    return datetime;
  }
  let date = new Date(datetime);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = String(minutes).padStart(2, "0");

  let formattedDate =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(hours).padStart(2, "0") +
    ":" +
    minutes +
    " " +
    ampm;

  if (locale == "vi") {
    formattedDate =
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0") +
      " " +
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();
  }
  return formattedDate;
};

export class DateTime {
  constructor(timeZone = "Asia/Ho_Chi_Minh", locales = "vi-vn") {
    this.timeZone = timeZone;
    this.locales = locales;
  }

  timestamp() {
    const newDateTime = new Date().toLocaleString("en-US", { timeZone: this.timeZone });
    return Date.parse(newDateTime) / 1000;
  }

  date() {
    return new Date().toLocaleDateString(this.locales, { timeZone: this.timeZone });
  }

  time() {
    return new Date().toLocaleTimeString(this.locales, { timeZone: this.timeZone });
  }
}
