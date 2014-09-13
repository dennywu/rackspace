String.prototype.toDate = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    var day = ("0" + dateFormated.getDate()).slice(-2);
    var month = dateFormated.getMonth();
    var year = dateFormated.getFullYear();
    return day + " " + ConvertMonthToIndonesian(month) + " " + year;
}
String.prototype.toFormatDateTime = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    var day = ("0" + dateFormated.getDate()).slice(-2);
    var month = dateFormated.getMonth();
    var year = dateFormated.getFullYear();
    var hour = ("0" + dateFormated.getHours()).slice(-2);
    var minute = ("0" + dateFormated.getMinutes()).slice(-2);
    var second = ("0" + dateFormated.getSeconds()).slice(-2);
    return day + " " + ConvertMonthToIndonesian(month) + " " + year + " " + hour + ":" + minute + ":" + second;
}
Number.prototype.toDateTimeFromTick = function () {
    var dateFormated = new Date(this);
    var day = ("0" + dateFormated.getDate()).slice(-2);
    var month = dateFormated.getMonth();
    var year = dateFormated.getFullYear();
    var hour = ("0" + dateFormated.getHours()).slice(-2);
    var minute = ("0" + dateFormated.getMinutes()).slice(-2);
    var second = ("0" + dateFormated.getSeconds()).slice(-2);
    return day + " " + ConvertMonthToIndonesian(month) + " " + year + " " + hour + ":" + minute + ":" + second;
}
String.prototype.toMonthAndYear = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    var month = dateFormated.getMonth();
    var year = dateFormated.getFullYear();
    return ConvertMonthToIndonesian(month) + " " + year;
}
String.prototype.toYear = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    var year = dateFormated.getFullYear();
    return year;
}
var ConvertMonthToIndonesian = function (month) {
    var bulan = new Array("Januari",
    "Februari", "Maret", "April",
    "Mei", "Juni", "Juli",
    "Agustus", "September",
    "Oktober", "November",
    "Desember");

    return bulan[month];
}
String.prototype.toDate4Digit = function () {
    var month = getMonth(this.substr(0, 2));
    var year = this.substr(2);
    return month + " " + year;
};
var getMonth = function (m) {
    var value = (m > 9) ? m : m.slice(-1);
    var key = parseInt(value) - 1;
    return ConvertMonthToIndonesian(key);
}

var getCurrentDate = function () {
    var currentDate = new Date();
    var date = ("0" + currentDate.getDate()).slice(-2);
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    var year = currentDate.getFullYear();

    return date + "-" + month + "-" + year;
};

var getCurrentDateTime = function () {
    var date = new Date();
    var currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    return currentDate;
};

var getCurrentYear = function () {
    var currentDate = new Date();
    var year = currentDate.getFullYear();

    return year;
};
var getStartDayInMonth = function () {
    var d = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var date = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return date + "-" + month + "-" + year;
};
var getStartDayInYear = function () {
    var d = new Date(new Date().getFullYear(),0, 1);
    var date = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return date + "-" + month + "-" + year;
};

Date.prototype.toDateFromFullDateTime = function () {
    var day = ("0" + this.getDate()).slice(-2);
    var month = ("0" + this.getMonth()).slice(-2);
    var year = this.getFullYear();
    return day + "-" + month + "-" + year;
}

String.prototype.toDateFromStringDate = function () {
    var day = ("0" + this.split('-')[0]).slice(-2);
    var month = getMonth(this.split('-')[1]);
    var year = this.split('-')[2];
    return day + " " + month + " " + year;
}

String.prototype.toDefaultFormatDate = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    var day = ("0" + dateFormated.getDate()).slice(-2);
    var month = ("0" + (dateFormated.getMonth() + 1)).slice(-2);
    var year = dateFormated.getFullYear();
    return day + "-" + month + "-" + year;
}

String.prototype.toDateTime = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    return dateFormated;
}

String.prototype.toUTCDate = function () {
    var dateFormated = new Date(parseInt(this.replace(/\/Date\((-?\d+)\)\//, '$1')));
    return parseInt(dateFormated.toUTC());
}

Number.prototype.getDay = function () {
    var date = new Date(this);
    return date.getDate();
}
Number.prototype.getMonth = function () {
    var date = new Date(this);
    return ConvertMonthToIndonesian(date.getMonth());
}