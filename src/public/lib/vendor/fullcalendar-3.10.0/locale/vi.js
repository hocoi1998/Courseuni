!(function (t, n) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = n(require('moment'), require('fullcalendar')))
        : 'function' == typeof define && define.amd
        ? define(['moment', 'fullcalendar'], n)
        : 'object' == typeof exports
        ? n(require('moment'), require('fullcalendar'))
        : n(t.moment, t.FullCalendar);
})('undefined' != typeof self ? self : this, function (t, n) {
    return (function (t) {
        function n(h) {
            if (e[h]) return e[h].exports;
            var r = (e[h] = { i: h, l: !1, exports: {} });
            return t[h].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
        }
        var e = {};
        return (
            (n.m = t),
            (n.c = e),
            (n.d = function (t, e, h) {
                n.o(t, e) ||
                    Object.defineProperty(t, e, {
                        configurable: !1,
                        enumerable: !0,
                        get: h,
                    });
            }),
            (n.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return n.d(e, 'a', e), e;
            }),
            (n.o = function (t, n) {
                return Object.prototype.hasOwnProperty.call(t, n);
            }),
            (n.p = ''),
            n((n.s = 209))
        );
    })({
        0: function (n, e) {
            n.exports = t;
        },
        1: function (t, e) {
            t.exports = n;
        },
        209: function (t, n, e) {
            Object.defineProperty(n, '__esModule', { value: !0 }), e(210);
            var h = e(1);
            h.datepickerLocale('vi', 'vi', {
                closeText: 'Đóng',
                prevText: '&#x3C;Trước',
                nextText: 'Tiếp&#x3E;',
                currentText: 'Hôm nay',
                monthNames: [
                    'Tháng Một',
                    'Tháng Hai',
                    'Tháng Ba',
                    'Tháng Tư',
                    'Tháng Năm',
                    'Tháng Sáu',
                    'Tháng Bảy',
                    'Tháng Tám',
                    'Tháng Chín',
                    'Tháng Mười',
                    'Tháng Mười Một',
                    'Tháng Mười Hai',
                ],
                monthNamesShort: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
                dayNames: [
                    'Chủ Nhật',
                    'Thứ Hai',
                    'Thứ Ba',
                    'Thứ Tư',
                    'Thứ Năm',
                    'Thứ Sáu',
                    'Thứ Bảy',
                ],
                dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                weekHeader: 'Tu',
                dateFormat: 'dd/mm/yy',
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: '',
            }),
                h.locale('vi', {
                    buttonText: {
                        month: 'Tháng',
                        week: 'Tuần',
                        day: 'Ngày',
                        list: 'Lịch biểu',
                    },
                    allDayText: 'Cả ngày',
                    eventLimitText: function (t) {
                        return '+ thêm ' + t;
                    },
                    noEventsMessage: 'Không có sự kiện để hiển thị',
                });
        },
        210: function (t, n, e) {
            !(function (t, n) {
                n(e(0));
            })(0, function (t) {
                return t.defineLocale('vi', {
                    months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
                        '_',
                    ),
                    monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split(
                        '_',
                    ),
                    monthsParseExact: !0,
                    weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split(
                        '_',
                    ),
                    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
                    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
                    weekdaysParseExact: !0,
                    meridiemParse: /sa|ch/i,
                    isPM: function (t) {
                        return /^ch$/i.test(t);
                    },
                    meridiem: function (t, n, e) {
                        return t < 12 ? (e ? 'sa' : 'SA') : e ? 'ch' : 'CH';
                    },
                    longDateFormat: {
                        LT: 'HH:mm',
                        LTS: 'HH:mm:ss',
                        L: 'DD/MM/YYYY',
                        LL: 'D MMMM [năm] YYYY',
                        LLL: 'D MMMM [năm] YYYY HH:mm',
                        LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
                        l: 'DD/M/YYYY',
                        ll: 'D MMM YYYY',
                        lll: 'D MMM YYYY HH:mm',
                        llll: 'ddd, D MMM YYYY HH:mm',
                    },
                    calendar: {
                        sameDay: '[Hôm nay lúc] LT',
                        nextDay: '[Ngày mai lúc] LT',
                        nextWeek: 'dddd [tuần tới lúc] LT',
                        lastDay: '[Hôm qua lúc] LT',
                        lastWeek: 'dddd [tuần rồi lúc] LT',
                        sameElse: 'L',
                    },
                    relativeTime: {
                        future: '%s tới',
                        past: '%s trước',
                        s: 'vài giây',
                        ss: '%d giây',
                        m: 'một phút',
                        mm: '%d phút',
                        h: 'một giờ',
                        hh: '%d giờ',
                        d: 'một ngày',
                        dd: '%d ngày',
                        M: 'một tháng',
                        MM: '%d tháng',
                        y: 'một năm',
                        yy: '%d năm',
                    },
                    dayOfMonthOrdinalParse: /\d{1,2}/,
                    ordinal: function (t) {
                        return t;
                    },
                    week: { dow: 1, doy: 4 },
                });
            });
        },
    });
});
