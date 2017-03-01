var config = {
    defPageSize: 50,
    closeTime: 3000,
    changeExp: true,
    uid: 0,
    opacity : .6,
    showTipClose : true,
    ajaxTimeout : 60000,
    zindex : 2000,
    groupPageNum: 12, //鹰群翻页 每页条数

    editorType: 0,
    showAlertTimeObj: null,
    showAlertTimer: null,
    uploadArr: [],
    winH: (function() {
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return h;
    })(),
    winW: (function() {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return w;
    })()
};

$.extend({
    /**
     * 公共正则
     * @val  需要被验证的字符串 string
     * @type 验证类型 string
     * */
    checkVal: function(val, type) {
        var reg = {
            email : /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            password : /^[\w]{6,20}$/,
            cas : /^\d{1,}-\d{1,}-\d{1,}$/,
            ch : /^[\u4e00-\u9fa5]+$/,
            en : /^[a-zA-Z]+$/,
            num : /^\d+$/,
            username : /^[a-zA-Z0-9_.@-]{1,}$/,
            noempty : /\S/,
            name : /^[\u4e00-\u9fa5a-zA-Z0-9]{1,}/,
            expression : /\w*\.\w{3,}/,
            phone : /(^(\d{3,4}-)?\d{7,8})$|(^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$)/,
            code : /[1-9]\d{5}(?!\d)/,
            fax : /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
            float : /^\d+(\.\d+)?$/,
            str: /[^|#\`\^\&\(\)<>\?:"\{\},\.\\\/;'\[\]]+$/
        }
        if(!reg[type]){
            console.log('判断类型不存在');
            return;
        }
        var result = reg[type].test(val);
        return result;
    },
    
    //关闭modal
    closeModal: function(){
        if($('.modal').modal){
            $('.modal').modal('hide');
        };
    },
    
    /**
     *@type string:  success error warning
     * */
    showContent: function(type, title, con, okfn, className, okvalue, closevalue){
        $('.follow_tip').remove();
        $('.alert_title').html(title);
        var modalDialog = $('.pop_modal .modal-dialog');
        
        if(type){
            var html = '<div class="modal_alert_box '+type+'"><i class="'+type+'"></i>' + con +' </div>';
        }else{
            var html = '<div class="show-pop-content">' + con +' </div>';
        }
        $('.pop_modal .modal-body').html(html);
        
        
        $('.pop_modal').modal('show', null, okvalue, closevalue); 
        
        okfn ? $('body').off('click.pop_modal_submit').on('click.pop_modal_submit', '.pop_modal_submit', function(){         
            okfn();
        }) : '';
        
        $('.pop_modal').on('hidden.bs.modal', function(){
            modalDialog.removeAttr('style');
            $('body').off('click.pop_modal_submit');
            if(className){
                modalDialog.removeClass(className)
            }
        });
        
        if(!okfn){
            $('.pop_modal_submit').hide();
        }else{
            $('.pop_modal_submit').show();
        }
        if(className){
            modalDialog.addClass(className);
        }
    },
    
    /**
     * 弹出提示语 没有title
     * @author heqh
     * */
    showAlert: function(str, timer){
        var showTipClose = true;
        if($('.show-alert').length > 0){
            $('.show-alert').remove();
            config.showAlertTimer ? clearTimeout(config.showAlertTimer) : '';
        };
        $('body').append('<div class="show-alert">'+str+'</div>');
//        $('.show-alert').css({
//            'marginLeft' : $('.show-alert').outerWidth() / 2 * -1,
//            'width': $('.show-alert').outerWidth()
//        });
        
        config.showAlertTimer = setTimeout(function(){
            $('.show-alert').remove();
            clearTimeout(config.showAlertTimer);
        }, timer || config.closeTime);
    },

    /**
     * @author heqh 
     * @return 窗口的高度
     */
    getWindowH: function() {
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return h;
    },
    
    /**
     * @author heqh 
     * @return 窗口的宽度
     */
    getWindowW: function() {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return w;
    }
});