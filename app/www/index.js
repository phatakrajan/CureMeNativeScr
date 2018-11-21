(function () {
    var oWebViewInterface = window.nsWebViewInterface;
    /**
    * Registers handlers for native events.
    */
    function addNativeMsgListener() {

    }

    /**
     * Defines global functions which will be called from andorid/ios
     */
    function defineNativeInterfaceFunctions() {
        /**
         *  Handles new language addition initiated by native app
         */
        window.loadHtml = function (html) {
            $("div.contentElement").empty().append(html);
            //document.getElementById("contentElement").innerHTML = html;
            oWebViewInterface.emit('htmlLoaded');
        };

    }

    function init() {
        addNativeMsgListener();
        defineNativeInterfaceFunctions();		
    }

    init();
})();