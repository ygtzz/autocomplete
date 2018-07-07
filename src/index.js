import assign from 'object-assign';

function AutoComplete(opts){
    opts = assign({
        target: '.autocomplete',
        dataset: [],
        debounce: 300
    }, opts);
    if(dataset.length < 1){
        return;
    }
    var self = this;
    self.opts = opts;
    self.target = document.querySelector(opts.target);

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
    var box = self.target.getBoundingClientRect();
    var pos = {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft,
        width: box.right - box.left,
        height: box.bottom - box.top
    }
    pos.top += pos.height;
    //插入提示框
    var autoId = 'auto-' + (+new Date());
    var boxHtml = `<div id="${autoId}" style="left:${pos.left}px;top:${pos.top}px;width:${pos.width}px;position:absolute;" class="autoc">
                     <ul class="autos"></ul>
                  </div>`;
    document.body.insertAdjacentHTML('beforeend',boxHtml);
    self.autoc = document.getElementById(autoId);
    self.pos = -1;
    self.originValue = '';
    self.resultData = [];
    //监听输入框内容
    AutoComplete.prototype._changeAutoCompleteDebounce = debounce(AutoComplete.prototype._changeAutoComplete,opts.debounce);
    self.target.addEventListener('keydown',function(e){
        var code = e.which || e.keyCode;
        if(code == 38){
            e.preventDefault();
        }
    });
    self.target.addEventListener('keyup',function(e){
        e.preventDefault();
        var code = e.which || e.keyCode;
        var inputValue = e.target.value;
        self._changeAutoComplete(code,inputValue);
    });
}

AutoComplete.prototype._changeAutoComplete = function(code,inputValue){
    console.log('complete ' + inputValue);
    console.log('code ' + code);
    var autoc = this.autoc;
    //上键 38
    if(code == 38){
        if(this.pos > -1){
            this.pos -= 1;
        }
        else{
            this.pos = this.resultData.length - 1;
        }
        this._highlightAutoComplete(this.pos);
    }
    //下键 40
    else if(code == 40){
        if(this.pos < this.resultData.length - 1){
            this.pos += 1;
        }
        else{
            this.pos = -1;
        }
        this._highlightAutoComplete(this.pos);
    }
    else{
        //todo add debounce
        var resultData = this._findData(inputValue,this.opts.dataset);
        this.resultData = resultData;
        this.originValue = inputValue;
        if(resultData && resultData.length){
            autoc.style.display = 'block';
            var dataHtml = resultData.map(function(item){
                return  `<li class="auto-item">
                            <div class="auto-inner">${item.value}</div>
                        </li>`
            }).join('');
            autoc.querySelector('.autos').innerHTML = dataHtml;
        }
        else{
            autoc.style.display = 'none';
        }
        //重置位置
        this.pos = -1;
    }
}

AutoComplete.prototype._highlightAutoComplete = function(pos){
    var items = Array.prototype.slice.call(this.autoc.querySelectorAll('.auto-item'));
    items.forEach(function(item){
        removeClass(item,'active');
    });
    if(pos != -1){
        var activeItem = items[pos];
        addClass(activeItem,'active');
        this.target.value = activeItem.querySelector('.auto-inner').innerHTML;
    }
    else{
        this.target.value = this.originValue;
    }
}   

AutoComplete.prototype._findData = function(str,dataset){
    return dataset.filter(function(item){
        return item.value.indexOf(str) > -1 && str.length > 0;
    });
}

function debounce(fn, delay) {
    var timer;
    return function() {
        var ctx = this,args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(ctx,args);
        }, delay);
    }
}

function addClass(dom,className){
    dom.classList.add(className);
}  

function removeClass(dom,className){
    dom.classList.remove(className);
}

export {AutoComplete};
