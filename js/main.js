$(function () {
    let tabId = 'tab';

    for (let i = 0; i < localStorage.length; i++) {
        tabId = localStorage.key(i);
        const jsonData = localStorage.getItem(tabId);
        const value = JSON.parse(jsonData || 'null');
        console.log(tabId);
        if (value) {
            const tabDetail =
                `<div class="tabItem" id="${tabId}" data-id="${tabId}">
                <label for="inputArea" data-id="${tabId}">
                <h1 data-id="${tabId}">${value[1]}</h1>
                <p data-id="${tabId}">${value[0]}</p>
                </label>
                </div>`;
            $('.tabArea').prepend(tabDetail);
            $('#inputArea').val(value[1]);
            $('.memoArea > p').html(value[0]);
        } else {
            //正常でない場合はデータを削除
            localStorage.removeItem(tabId);
        }
    }

    //新規ボタンを押した時
    $('#newMemo').on('click', function () {
        $('.tabItem').removeClass('yellow').removeClass('gray');
        $('#inputArea').val("");
        $('.memoArea > p').html("");
        tabId = 'tab';
        const day = new Date();
        const tabNum = day.getTime();
        // const tabNum = localStorage.length;
        console.log(tabNum, "ローカルストレージの確認");
        tabId += tabNum;
        const tabDetail =
            `<div class="tabItem" id="${tabId}" data-id="${tabId}" style="display:none">
            <label for="inputArea" data-id="${tabId}">
            <h1 data-id="${tabId}">新規メモ</h1>
            <p data-id="${tabId}"></p>
            </label>
            </div>`;
        $('.tabArea').prepend(tabDetail);
        $('#' + tabId).animate({ height: 'show' }, 200, 'swing');
        $('#' + tabId).addClass('gray');
        localStorage.setItem(tabId, '');
    });

    //メモを入力した時
    $('#inputArea').keyup(function () {
        $('.tabItem').removeClass('yellow').removeClass('gray');
        let nowD = nowDay();
        $('.memoArea > p').html(nowD);
        let value = $('#inputArea').val();
        let inputData = [nowD, value];
        let jsdata = JSON.stringify(inputData);
        localStorage.setItem(tabId, jsdata);
        let tabValue =
            `<label for="inputArea" data-id="${tabId}">
            <h1 data-id="${tabId}">${value}</h1>
            <p data-id="${tabId}">${nowD}</p>
            </label>`;
        $('#' + tabId).html(tabValue);
        $('#' + tabId).addClass('gray');
    });


    //タブを選択
    $('.tabArea').on('click', '.tabItem', function () {
        $('.tabItem').removeClass('yellow').removeClass('gray');
        $('#inputArea').val("");
        $('.memoArea > p').html("");
        tabId = $(this).data('id');
        console.log(tabId);
        let value = JSON.parse(localStorage.getItem(tabId));
        if (value) {
            $('#inputArea').val(value[1]);
            $('.memoArea > p').html(value[0]);
        }
        $('#' + tabId).addClass('yellow');
    });

    //削除
    $('#deleteMemo').on('click', function () {
        $('#' + tabId).animate({ height: 'hide' }, 200, 'swing');
        localStorage.removeItem(tabId);
        setTimeout(function () {
            $('#' + tabId).remove();
            $('#inputArea').val("");
            $('.memoArea > p').html("");
        }, 200);
    });


    //クリア
    $('#deleteMemo').dblclick(function () {
        localStorage.clear();
        $('#inputArea').val("");
        $('.memoArea > p').html("");
        $('.tabItem').animate({ height: 'hide' }, 200, 'swing');
        setTimeout(function () {
            $('.tabItem').remove();
        }, 200)
    });

    //検索
    $('#search').on('input', function () {
        tabId = '';
        $('.tabItem').removeClass('yellow').removeClass('gray');
        $('#inputArea').val("");
        $('.memoArea > p').html("");
        let searchText = $(this).val();
        $('.tabItem').each(function () {
            let targetText = $(this).text();
            if (targetText.indexOf(searchText) != -1) {
                $(this).removeClass('hide');
            } else {
                $(this).addClass('hide');
            }
        });
    });

    //今日の日付を作る
    function nowDay() {
        let hiduke = new Date();
        let year = hiduke.getFullYear();
        let month = hiduke.getMonth() + 1;
        let day = hiduke.getDate();
        let nowday = year + "年" + month + "月" + day + "日 ";
        let hour = hiduke.getHours();
        let minute = hiduke.getMinutes();
        //分が１桁の時前に０をつける
        if (minute < 10) {
            minute = '0' + minute;
        }
        let nowtime = hour + ":" + minute;
        //完成した日時を戻り値として返す
        return nowday + nowtime;
    }



});